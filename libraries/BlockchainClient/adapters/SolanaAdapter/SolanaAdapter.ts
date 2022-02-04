import { Keypair } from '@solana/web3.js'
import {
  AcceptFriendRequestParams,
  Account,
  Adapter,
  CreateUserParams,
  DenyFriendRequestParams,
  FindFriendsParams,
  FriendsEvents,
  RemoveFriendParams,
  RemoveFriendRequestParams,
  SendFriendRequestParams,
  User,
} from '../../interfaces'
import {
  accountFromWallet,
  publicKeyFromAddress,
  walletFromAccount,
} from './utils'
import SolanaManager from '~/libraries/Solana/SolanaManager/SolanaManager'
import FriendsProgram from '~/libraries/Solana/FriendsProgram/FriendsProgram'
import ServerProgram from '~/libraries/Solana/ServerProgram/ServerProgram'
import {
  FriendAccount,
  FriendStatus,
} from '~/libraries/Solana/FriendsProgram/FriendsProgram.types'
import { FriendsError } from '~/store/friends/types'
import { AccountsError } from '~/store/accounts/types'

export default class SolanaAdapter implements Adapter {
  private readonly solanaManager: SolanaManager
  private usersProgram: ServerProgram
  private friendsProgram: FriendsProgram

  constructor() {
    this.solanaManager = new SolanaManager()
    this.usersProgram = new ServerProgram(this.solanaManager)
    this.friendsProgram = new FriendsProgram(this.solanaManager)
  }

  async acceptFriendRequest(
    params: AcceptFriendRequestParams,
  ): Promise<boolean> {
    await this.initSolanaManager(params.toAccount)

    const { userAccount } = this.getAccounts()
    const userFromKey = publicKeyFromAddress(params.fromAddress)

    const computedFriendAccountKey =
      await this.friendsProgram.computeFriendAccountKey(
        userFromKey,
        userAccount.publicKey,
      )

    const result = await this.friendsProgram.acceptFriendRequest(
      computedFriendAccountKey,
      publicKeyFromAddress(params.fromAddress),
      userAccount,
      Buffer.from(params.toMailboxId.padStart(128, '0')),
    )

    return !!result
  }

  async createRandomAccount(): Promise<Account> {
    const wallet = await this.solanaManager.createRandomKeypair()
    return accountFromWallet(wallet)
  }

  async createUser(params: CreateUserParams): Promise<boolean> {
    if (params.account) {
      await this.initSolanaManager(params.account)
      await this.usersProgram.createUser(
        params.name,
        params.photoHash,
        params.status,
      )
      return true
    }
    return false
  }

  async denyFriendRequest(params: DenyFriendRequestParams): Promise<boolean> {
    await this.initSolanaManager(params.toAccount)

    const { userAccount } = this.getAccounts()
    const fromPublicKey = publicKeyFromAddress(params.fromAddress)

    const computedFriendAccountKey =
      await this.friendsProgram.computeFriendAccountKey(
        fromPublicKey,
        userAccount.publicKey,
      )

    const result = await this.friendsProgram.denyFriendRequest(
      computedFriendAccountKey,
      fromPublicKey,
      userAccount,
    )

    return !!result
  }

  async getAccountBalance(account: Account): Promise<number | null> {
    await this.initSolanaManager(account)
    return this.solanaManager.getCurrentAccountBalance()
  }

  async getAccountFromMnemonic(mnemonic: string): Promise<Account | null> {
    await this.solanaManager.initializeFromMnemonic(mnemonic)
    const wallet = this.solanaManager.getMainSolanaWalletInstance()
    if (wallet) {
      return accountFromWallet(wallet)
    }
    return null
  }

  getFriendAccount(address: string): Promise<FriendAccount | null> {
    return this.friendsProgram.getParsedFriend(publicKeyFromAddress(address))
  }

  async getUser(address: string): Promise<User | null> {
    const user = await this.usersProgram.getUser(publicKeyFromAddress(address))
    if (user) return { address, ...user }
    return null
  }

  async getAccountUser(account: Account): Promise<User | null> {
    await this.initSolanaManager(account)
    const { userAccount } = this.getAccounts()
    const user = await this.usersProgram.getUser(userAccount.publicKey)
    if (user) {
      return { address: userAccount.publicKey.toBase58(), ...user }
    }
    return null
  }

  async removeFriend({
    friendAccountAddress,
    account,
  }: RemoveFriendParams): Promise<boolean> {
    await this.initSolanaManager(account)
    const { userAccount } = this.getAccounts()
    const friend = await this.getFriendAccount(friendAccountAddress)

    if (friend) {
      const result = await this.friendsProgram.removeFriend(friend, userAccount)
      return !!result
    }
    return false
  }

  async removeFriendRequest(
    params: RemoveFriendRequestParams,
  ): Promise<boolean> {
    await this.initSolanaManager(params.fromAccount)

    const { userAccount } = this.getAccounts()
    const toPublicKey = publicKeyFromAddress(params.toAddress)

    const computedFriendAccountMirroredKey =
      await this.friendsProgram.computeFriendAccountKey(
        userAccount.publicKey,
        toPublicKey,
      )

    const result = await this.friendsProgram.removeFriendRequest(
      computedFriendAccountMirroredKey,
      userAccount,
      toPublicKey,
    )

    return !!result
  }

  async searchUserByName(name: string): Promise<User[]> {
    const items = await this.usersProgram.searchByName(name)
    return items
      .filter((item) => item.userData)
      .map(
        (item): User =>
          <User>{
            address: item.address.toBase58(),
            ...item.userData,
          },
      )
  }

  async sendFriendRequest(
    params: SendFriendRequestParams,
  ): Promise<FriendAccount | null> {
    await this.initSolanaManager(params.fromAccount)

    const { userAccount } = this.getAccounts()
    const friendToKey = publicKeyFromAddress(params.toAddress)

    const friendAccountKey = await this.friendsProgram.computeFriendAccountKey(
      userAccount.publicKey,
      friendToKey,
    )

    let friendAccountInfo = await this.friendsProgram.getFriend(
      friendAccountKey,
    )

    const friendAccountMirroredKey =
      await this.friendsProgram.computeFriendAccountKey(
        friendToKey,
        userAccount.publicKey,
      )

    let friendAccountMirroredInfo = await this.friendsProgram.getFriend(
      friendAccountMirroredKey,
    )

    if (!friendAccountInfo) {
      friendAccountInfo = await this.friendsProgram.createFriend(
        userAccount.publicKey,
        friendToKey,
      )
    }

    if (!friendAccountMirroredInfo) {
      friendAccountMirroredInfo = await this.friendsProgram.createFriend(
        friendToKey,
        userAccount.publicKey,
      )
    }

    if (
      friendAccountInfo.status === FriendStatus.PENDING ||
      friendAccountMirroredInfo.status === FriendStatus.PENDING
    ) {
      throw new Error(FriendsError.REQUEST_ALREADY_SENT)
    }

    if (
      friendAccountInfo.status === FriendStatus.ACCEPTED ||
      friendAccountMirroredInfo.status === FriendStatus.ACCEPTED
    ) {
      throw new Error(FriendsError.REQUEST_ALREADY_ACCEPTED)
    }

    await this.friendsProgram.createFriendRequest(
      friendAccountKey,
      friendAccountMirroredKey,
      userAccount,
      friendToKey,
      Buffer.from(params.fromMailboxId.padStart(128, '0')),
    )

    return this.getFriendAccount(friendAccountKey.toBase58())
  }

  async findFriendAccounts(params: FindFriendsParams) {
    await this.initSolanaManager(params.account)
    return this.friendsProgram.getFriendAccountsByStatus(params.filter.status)
  }

  async subscribeToEvents(account: Account) {
    await this.initSolanaManager(account)
    this.friendsProgram.subscribeToFriendsEvents()
  }

  addEventListener(
    type: FriendsEvents,
    callback: (data?: FriendAccount) => void,
  ) {
    this.friendsProgram.addEventListener(type, callback)
  }

  removeEventListener(
    type: FriendsEvents,
    callback: (data?: FriendAccount) => void,
  ) {
    this.friendsProgram.removeEventListener(type, callback)
  }

  private async initSolanaManager(account: Account) {
    await this.solanaManager.initializeFromSolanaWallet(
      walletFromAccount(account),
    )
  }

  private getAccounts(): {
    payerAccount: Keypair
    userAccount: Keypair
  } {
    const payerAccount = this.solanaManager.getActiveAccount()
    if (!payerAccount) {
      throw new Error(AccountsError.PAYER_NOT_PRESENT)
    }

    const userAccount = this.solanaManager.getUserAccount()
    if (!userAccount) {
      throw new Error(AccountsError.USER_DERIVATION_FAILED)
    }
    return {
      payerAccount,
      userAccount,
    }
  }
}
