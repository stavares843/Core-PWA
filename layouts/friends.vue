/* eslint-disable prettier/prettier */
<template>
  <div id="app-wrap" :class="`${sidebar ? 'is-open' : 'is-collapsed'}`">
    <div
      id="app"
      v-touch:swipe="sidebarSwipeHandler(this)"
      v-touch-options="{ swipeTolerance: 75 }"
      :class="`${sidebar ? 'is-open' : 'is-collapsed'} ${
        $device.isMobile ? 'mobile-app' : ''
      }`"
    >
      <UiGlobal />

      <TailoredCoreSlimbar
        :servers="$mock.servers"
        :unreads="unreadMessages"
        :open-modal="toggleModal"
      />
      <TailoredCoreSidebar
        :toggle="() => ($data.sidebar = !$data.sidebar)"
        :users="friends.all"
        :groups="$mock.groups"
      />
      <div class="dynamic-content">
        <Nuxt
id="friends" ref="chat"
/>
      </div>
    </div>
    <TailoredCoreMobileNav v-if="$device.isMobile" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { mobileSwipe } from '~/components/mixins/Swipe/Swipe'
import Layout from '~/components/mixins/Layouts/Layout'
import { MessagesTracker } from '~/types/textile/mailbox'
import { TextileState } from '~/store/textile/types'

export default Vue.extend({
  name: 'ChatLayout',
  mixins: [mobileSwipe, Layout],
  middleware: 'authenticated',
  data() {
    return {
      sidebar: true,
      unreadMessages: [{}],
    }
  },
  computed: {
    ...mapState(['friends', 'textile']),
  },
  methods: {
    checkUnreadMessages() {
      let unreadMessageList = [{}]
      Object.keys(this.textile.conversations).forEach((conversation) => {
        if (conversation.unreadCount !== 0) {
          unreadMessageList.push(conversation)
        }
      })
      this.unreadMessages = unreadMessageList.sort((timeRecived: MessagesTracker, nextTime: MessagesTracker) => {
        return timeRecived.lastMsg.at - nextTime.lastMsg.at
      })
    },
  },
})
</script>

<style lang="less" src="./Layout.less"></style>
