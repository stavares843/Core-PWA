import { computed, ComputedRef, reactive } from 'vue'
import { useNuxtApp } from '@nuxt/bridge/dist/runtime/app'
import { Conversation } from '~/libraries/Iridium/chat/types'
import iridium from '~/libraries/Iridium/IridiumManager'
import { User } from '~/libraries/Iridium/users/types'
import { TrackKind } from '~/libraries/WebRTC/types'
import { conversationHooks } from '~/components/compositions/conversations'

export function webrtcHooks(conversationId?: Conversation['id']) {
  const managers = reactive({
    users: iridium.users,
    webrtc: iridium.webRTC,
  })

  const { isGroup, otherDids } = conversationHooks(conversationId)

  // todo remove group check after group call implementation
  const enableRTC: ComputedRef<boolean> = computed(() => {
    if (isActiveCall.value) {
      return false
    }
    return Boolean(
      otherDids.value?.filter(
        (did) => managers.users.ephemeral.status[did] === 'online',
      ).length && !isGroup.value,
    )
  })

  const isActiveCall: ComputedRef<boolean> = computed(() => {
    return managers.webrtc.isActiveCall(conversationId)
  })

  async function call({
    recipient,
    conversationId,
    kinds,
  }: {
    recipient: User['did']
    conversationId: Conversation['id']
    kinds: TrackKind[]
  }) {
    const $nuxt = useNuxtApp()

    if (!enableRTC.value) {
      return
    }

    // todo - refactor to accept multiple recipients for group calls
    try {
      await iridium.webRTC.call({
        recipient,
        conversationId,
        kinds,
      })
      await iridium.chat?.sendMessage({
        conversationId,
        type: 'call',
        at: Date.now(),
        attachments: [],
        call: {},
      })
    } catch (e) {
      $nuxt.$toast.error($nuxt.$i18n.t(e.message))
    }
  }
  return { enableRTC, isActiveCall, call }
}
