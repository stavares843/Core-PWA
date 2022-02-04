import { PublicKey } from '@solana/web3.js'
import Vue from 'vue'
import { DataStateType } from '../dataState/types'
import {
  AcceptFriendRequestArguments,
  CreateFriendRequestArguments,
  FriendsError,
  FriendsState,
} from './types'
import Crypto from '~/libraries/Crypto/Crypto'
import {
  FriendAccount,
  FriendsEvents,
  FriendStatus,
} from '~/libraries/Solana/FriendsProgram/FriendsProgram.types'
import {
  Friend,
  FriendRequest,
  IncomingRequest,
  OutgoingRequest,
} from '~/types/ui/friends'
import { ActionsArguments } from '~/types/store/store'
import { RawUser } from '~/types/ui/user'
import TextileManager from '~/libraries/Textile/TextileManager'
import BlockchainClient from '~/libraries/BlockchainClient'

export default {
  /**
   * @method fetchFriendRequests DocsTODO
   * @description
   * @param
   * @example
   */
  async fetchFriendRequests({ commit }: ActionsArguments<FriendsState>) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient

    const { incoming, outgoing } = await $BlockchainClient.findFriendAccounts({
      status: FriendStatus.ACCEPTED,
    })
    const incomingRequests = await Promise.all(
      incoming.map(async (account) => {
        const userInfo = await $BlockchainClient.getUser(account.from)
        return friendAccountToIncomingRequest(account, userInfo)
      }),
    )

    const outgoingRequests = outgoing.map<OutgoingRequest>((account) =>
      friendAccountToOutgoingRequest(account),
    )

    commit('setIncomingRequests', incomingRequests)
    commit('setOutgoingRequests', outgoingRequests)
  },
  /**
   * @method fetchFriends DocsTODO
   * @description
   * @param
   * @example
   */
  async fetchFriends({ dispatch, commit }: ActionsArguments<FriendsState>) {
    commit(
      'dataState/setDataState',
      { key: 'friends', value: DataStateType.Loading },
      { root: true },
    )
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient

    const { incoming, outgoing } = await $BlockchainClient.findFriendAccounts({
      status: FriendStatus.ACCEPTED,
    })
    const allFriendsData = [...incoming, ...outgoing]

    allFriendsData.forEach((friendData) => {
      dispatch('fetchFriendDetails', friendData)
    })

    // // Attempt RTC Connection to all friends
    // // TODO: We should probably only try to connect to friends we're actually chatting with
    // // If they call us we'll accept their connection
    // dispatch('webrtc/startup', allFriendsData, { root: true })

    commit(
      'dataState/setDataState',
      { key: 'friends', value: DataStateType.Ready },
      { root: true },
    )
  },
  /**
   * @method fetchFriendDetails DocsTODO
   * @description
   * @param friendAccount
   * @example
   */
  async fetchFriendDetails(
    { commit, state, rootState, dispatch }: ActionsArguments<FriendsState>,
    friendAccount: FriendAccount,
  ) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient
    const $Crypto: Crypto = Vue.prototype.$Crypto

    // Check if the request was originally sent by the current user (outgoing)
    // and then accepted, or the other way round
    const userKey = rootState.accounts.active
    const sentByMe = friendAccount.from === userKey
    const friendKey = sentByMe ? friendAccount.to : friendAccount.from
    const encryptedTextilePubkey = sentByMe
      ? friendAccount.toMailboxId
      : friendAccount.fromMailboxId

    // Initialize encryption engine for the given recipient and decrypt
    // the mailboxId
    await $Crypto.initializeRecipient(new PublicKey(friendKey))
    const textilePubkey = await $Crypto.decryptFrom(
      friendKey,
      encryptedTextilePubkey,
    )
    const rawUser = await $BlockchainClient.getUser(friendKey)
    if (!rawUser) {
      throw new Error(FriendsError.FRIEND_INFO_NOT_FOUND)
    }

    const friend: Omit<Friend, 'publicKey' | 'typingState'> = {
      account: friendAccount,
      name: rawUser.name,
      profilePicture: rawUser.photoHash,
      status: rawUser.status,
      encryptedTextilePubkey,
      textilePubkey,
      item: {},
      pending: false,
      activeChat: false,
      address: friendKey,
      state: 'offline',
      unreadCount: 0,
    }

    const $Hounddog = Vue.prototype.$Hounddog
    const friendExists = $Hounddog.friendExists(state, friend)

    if (!friendExists) {
      commit('addFriend', friend)

      // Try create the webrtc connection
      dispatch('webrtc/createPeerConnection', friend.address, { root: true })

      // Eventually delete the related friend request
      commit(
        'removeIncomingRequest',
        friendAccountToIncomingRequest(friendAccount, null).requestId,
      )
      commit(
        'removeOutgoingRequest',
        friendAccountToOutgoingRequest(friendAccount).requestId,
      )
      return
    }
    commit('updateFriend', friend)
  },
  /**
   * @method subscribeToFriendsEvents DocsTODO
   * @description
   * @param
   * @example
   */
  async subscribeToFriendsEvents({
    dispatch,
    commit,
  }: ActionsArguments<FriendsState>) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient

    const user = await $BlockchainClient.getCurrentUser()

    await $BlockchainClient.subscribeToEvents()

    $BlockchainClient.addEventListener(
      FriendsEvents.NEW_REQUEST,
      async (account) => {
        if (account) {
          const userInfo = await $BlockchainClient.getUser(account.from)
          commit(
            'addIncomingRequest',
            friendAccountToIncomingRequest(account, userInfo),
          )
        }
      },
    )

    $BlockchainClient.addEventListener(FriendsEvents.NEW_FRIEND, (account) => {
      if (account) {
        dispatch('fetchFriendDetails', account)
      }
    })

    $BlockchainClient.addEventListener(
      FriendsEvents.REQUEST_DENIED,
      (account) => {
        if (account) {
          commit(
            'removeOutgoingRequest',
            friendAccountToOutgoingRequest(account).requestId,
          )
        }
      },
    )

    $BlockchainClient.addEventListener(
      FriendsEvents.REQUEST_REMOVED,
      (account) => {
        if (account) {
          commit(
            'removeIncomingRequest',
            friendAccountToIncomingRequest(account, null).requestId,
          )
        }
      },
    )

    $BlockchainClient.addEventListener(
      FriendsEvents.FRIEND_REMOVED,
      (account) => {
        console.log('FriendsEvents.FRIEND_REMOVED', account, user)
        if (account) {
          commit(
            'removeFriend',
            account.from === user?.address ? account.to : account.from,
          )
        }
      },
    )
  },
  /**
   * @method createFriendRequest DocsTODO
   * @description
   * @param friendToKey
   * @param textileMailboxId
   * @example
   */
  async createFriendRequest(
    { commit }: ActionsArguments<FriendsState>,
    { friendToKey }: CreateFriendRequestArguments,
  ) {
    const $Crypto: Crypto = Vue.prototype.$Crypto
    const $TextileManager: TextileManager = Vue.prototype.$TextileManager
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient

    const textilePublicKey = $TextileManager.getIdentityPublicKey()

    if (!textilePublicKey) {
      throw new Error(FriendsError.TEXTILE_NOT_INITIALIZED)
    }

    // Initialize current recipient for encryption
    await $Crypto.initializeRecipient(friendToKey)

    // Encrypt textile mailbox id for the recipient
    const encryptedTextilePublicKey = await $Crypto.encryptFor(
      friendToKey.toBase58(),
      textilePublicKey,
    )

    const friendAccount = await $BlockchainClient.sendFriendRequest(
      friendToKey.toBase58(),
      encryptedTextilePublicKey,
    )

    if (friendAccount) {
      commit(
        'addOutgoingRequest',
        friendAccountToOutgoingRequest(friendAccount),
      )
    }
  },
  /**
   * @method acceptFriendRequest DocsTODO
   * @description
   * @param friendRequest
   * @param textileMailboxId
   * @example
   */
  async acceptFriendRequest(
    { commit, dispatch }: ActionsArguments<FriendsState>,
    { friendRequest }: AcceptFriendRequestArguments,
  ) {
    const $Crypto: Crypto = Vue.prototype.$Crypto
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient
    const $TextileManager: TextileManager = Vue.prototype.$TextileManager

    const textilePublicKey = $TextileManager.getIdentityPublicKey()

    if (!textilePublicKey) {
      throw new Error(FriendsError.TEXTILE_NOT_INITIALIZED)
    }

    commit('updateIncomingRequest', { ...friendRequest, pending: true })
    const { account } = friendRequest

    const friendFromKey = friendRequest.account.from

    // Initialize current recipient for encryption
    await $Crypto.initializeRecipient(new PublicKey(friendFromKey))

    // Encrypt textile mailbox id for the recipient
    const encryptedIdentityPublicKey = await $Crypto.encryptFor(
      friendFromKey,
      textilePublicKey,
    )

    const result = await $BlockchainClient.acceptFriendRequest(
      account.from,
      encryptedIdentityPublicKey,
    )

    if (result) {
      dispatch('fetchFriendDetails', account)
    }
  },
  /**
   * @method denyFriendRequest DocsTODO
   * @description
   * @param friendRequest
   * @example
   */
  async denyFriendRequest(
    { commit }: ActionsArguments<FriendsState>,
    friendRequest: FriendRequest,
  ) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient
    const { account } = friendRequest

    const result = await $BlockchainClient.denyFriendRequest(account.from)
    if (result) {
      commit('removeIncomingRequest', account.accountId)
    }
  },
  /**
   * @method removeFriendRequest DocsTODO
   * @description
   * @param friendRequest
   * @example
   */
  async removeFriendRequest(
    { commit }: ActionsArguments<FriendsState>,
    friendRequest: OutgoingRequest,
  ) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient
    const { account } = friendRequest

    const result = await $BlockchainClient.removeFriendRequest(account.to)
    if (result) {
      commit('removeOutgoingRequest', account.accountId)
    }
  },
  /**
   * @method removeFriend DocsTODO
   * @description
   * @param friend
   * @example
   */
  async removeFriend(
    { commit }: ActionsArguments<FriendsState>,
    friend: Friend,
  ) {
    const $BlockchainClient: BlockchainClient = Vue.prototype.$BlockchainClient

    const { account } = friend

    const result = await $BlockchainClient.removeFriend(account.accountId)
    if (result) {
      commit('removeFriend', friend.textilePubkey)
    }
  },
}

/**
 * Utility function that converts a FriendAccount
 * into an strongly typed IncomingRequest
 * @param friendAccount the FriendAccount data
 * @returns IncomingRequest object
 */
function friendAccountToIncomingRequest(
  friendAccount: FriendAccount,
  userInfo: RawUser | null,
): IncomingRequest {
  return {
    requestId: friendAccount.accountId,
    from: friendAccount.from,
    account: friendAccount,
    pending: false,
    userInfo,
  }
}

/**
 * Utility function that converts a FriendAccount
 * into an strongly typed OutgoingRequest
 * @param friendAccount the FriendAccount data
 * @returns OutgoingRequest object
 */
function friendAccountToOutgoingRequest(
  friendAccount: FriendAccount,
): OutgoingRequest {
  return {
    requestId: friendAccount.accountId,
    to: friendAccount.to,
    account: friendAccount,
    pending: false,
  }
}
