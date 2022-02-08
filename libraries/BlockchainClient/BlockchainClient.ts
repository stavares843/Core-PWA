import {
  Account,
  Adapter,
  FindFriendsFilter,
  FriendAccount,
  FriendRequest,
  FriendsEvents,
  User,
} from './interfaces'

export default class BlockchainClient {
  private adapter: Adapter
  private _account?: Account

  constructor(adapter: Adapter) {
    this.adapter = adapter
  }

  get account(): Account {
    if (!this._account) {
      throw new Error('Blockchain client is not initialized')
    }
    return this._account
  }

  get isInitialized(): boolean {
    return !!this._account
  }

  /**
   * @method initFromMnemonic
   * Initialize client from account with mnemonic
   * @param {string} mnemonic
   * @returns {Promise<void>}
   */
  async initFromMnemonic(mnemonic: string): Promise<void> {
    const account = await this.adapter.getAccountFromMnemonic(mnemonic)
    if (account) {
      this._account = account
    }
  }

  /**
   * @method initRandom
   * Create random account and initialize client
   * @returns {Promise<void>}
   */
  async initRandom(): Promise<void> {
    const account = await this.adapter.createRandomAccount()
    if (account) {
      this._account = account
    }
  }

  /**
   * @method createUser
   * Create user
   * @param {string} name username
   * @param {string} photoHash profile picture IPFS hash
   * @param {string} status status string
   * @returns {Promise<boolean>}
   */
  async createUser(
    name: string,
    photoHash: string,
    status: string,
  ): Promise<boolean> {
    return this.adapter.createUser({
      name,
      photoHash,
      status,
      account: this.account,
    })
  }

  /**
   * @method getUser
   * Get user by address
   * @param {string} address
   * @returns {Promise<User>} user object
   */
  getUser(address: string): Promise<User | null> {
    return this.adapter.getUser(address)
  }

  /**
   * @method getCurrentUser
   * Get current user
   * @returns {Promise<User>} user object
   */
  async getCurrentUser(): Promise<User | null> {
    return this.adapter.getAccountUser(this.account)
  }

  /**
   * @method getBalance
   * Get balance for current account
   * @returns {Promise<number | null>} balance amount or null
   */
  async getBalance(): Promise<number | null> {
    return this.adapter.getAccountBalance(this.account)
  }

  /**
   * @method sendFriendRequest
   * Send friend request
   * @param toAddress friend address
   * @param fromMailboxId mailbox identifier of sender
   * @returns {Promise<boolean>}
   */
  async sendFriendRequest(
    toAddress: string,
    fromMailboxId: string,
  ): Promise<FriendAccount | null> {
    return this.adapter.sendFriendRequest({
      toAddress,
      fromMailboxId,
      fromAccount: this.account,
    })
  }

  /**
   * @method acceptFriendRequest
   * Accept friend request
   * @param fromAddress sender address
   * @param toMailboxId mailbox identifier of recipient
   * @returns {Promise<boolean>}
   */
  async acceptFriendRequest(
    fromAddress: string,
    toMailboxId: string,
  ): Promise<boolean> {
    return this.adapter.acceptFriendRequest({
      fromAddress,
      toMailboxId,
      toAccount: this.account,
    })
  }

  /**
   * @method denyFriendRequest
   * Reject friend request
   * @param fromAddress sender address
   * @returns {Promise<boolean>}
   */
  async denyFriendRequest(fromAddress: string): Promise<boolean> {
    return this.adapter.denyFriendRequest({
      fromAddress,
      toAccount: this.account,
    })
  }

  /**
   * @method removeFriendRequest
   * Remove friend request
   * @param toAddress recipient address
   * @returns {Promise<boolean>}
   */
  async removeFriendRequest(toAddress: string): Promise<boolean> {
    return this.adapter.removeFriendRequest({
      toAddress,
      fromAccount: this.account,
    })
  }

  /**
   * @method removeFriend
   * Remove friend
   * @param friendAccountAddress address of friend account
   * @returns {Promise<boolean>}
   * TODO consider to use friend address instead of friend account address
   */
  async removeFriend(friendAccountAddress: string): Promise<boolean> {
    return this.adapter.removeFriend({
      friendAccountAddress,
      account: this.account,
    })
  }

  /**
   * Search friend accounts by filter
   * @param filter {FindFriendsFilter}
   * @returns {Promise<FriendAccount[]>}
   */
  async findFriendAccounts(
    filter: FindFriendsFilter,
  ): Promise<FriendAccount[]> {
    return this.adapter.findFriendAccounts({
      filter,
      account: this.account,
    })
  }

  /**
   * Search friend requests by filter
   * @param filter {FindFriendsFilter}
   * @returns {Promise<{incoming: FriendRequest[] outgoing: FriendRequest[]}>}
   */
  async findFriendRequests(filter: FindFriendsFilter): Promise<{
    incoming: FriendRequest[]
    outgoing: FriendRequest[]
  }> {
    const accounts = await this.findFriendAccounts(filter)
    const user = await this.getCurrentUser()

    const outgoing = await Promise.all(
      accounts
        .filter((item) => item.from === user?.address)
        .map(async (item) => ({
          ...item,
          toUser: await this.getUser(item.to),
        })),
    )

    const incoming = await Promise.all(
      accounts
        .filter((item) => item.from !== user?.address)
        .map(async (item) => ({
          ...item,
          fromUser: await this.getUser(item.from),
        })),
    )
    return { incoming, outgoing }
  }

  subscribeToEvents() {
    return this.adapter.subscribeToEvents(this.account)
  }

  addEventListener(
    type: FriendsEvents,
    callback: (data?: FriendAccount) => void,
  ): void {
    this.adapter.addEventListener(type, callback)
  }

  removeEventListener(
    type: FriendsEvents,
    callback: (data?: FriendAccount) => void,
  ): void {
    this.adapter.removeEventListener(type, callback)
  }
}
