export interface RawUser {
  name: string
  servers: any
  status: string
  photoHash: string
}

export interface User {
  address: string
  name: string
  servers: any
  status: string
  photoHash: string
}

export interface Account {
  mnemonic?: string
  privateKey: string
  path?: string
  address: string
}

export interface CreateUserParams {
  account: Account
  name: string
  photoHash: string
  status: string
}

export interface FriendAccount {
  accountId: string
  from: string
  status: number
  fromMailboxId: string
  toMailboxId: string
  to: string
}

export interface SendFriendRequestParams {
  fromAccount: Account
  toAddress: string
  fromMailboxId: string
}

export interface AcceptFriendRequestParams {
  fromAddress: string
  toAccount: Account
  toMailboxId: string
}

export interface RemoveFriendRequestParams {
  fromAccount: Account
  toAddress: string
}

export interface DenyFriendRequestParams {
  fromAddress: string
  toAccount: Account
}

export interface RemoveFriendParams {
  account: Account
  friendAddress: string
}

export interface Adapter {
  createRandomAccount(): Promise<Account>
  getAccountFromMnemonic(mnemonic: string): Promise<Account | null>
  getAccountBalance(account: Account): Promise<number | null>

  createUser(params: CreateUserParams): Promise<boolean>
  getUser(address: string): Promise<User | null>
  getAccountUser(account: Account): Promise<User | null>
  searchUserByName(name: string): Promise<User[]>

  sendFriendRequest(params: SendFriendRequestParams): Promise<boolean>
  acceptFriendRequest(params: AcceptFriendRequestParams): Promise<boolean>
  denyFriendRequest(params: DenyFriendRequestParams): Promise<boolean>
  removeFriendRequest(params: RemoveFriendRequestParams): Promise<boolean>
  removeFriend(params: RemoveFriendParams): Promise<boolean>
  getFriendAccount(address: string): Promise<FriendAccount | null>
}
