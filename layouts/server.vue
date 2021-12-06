<template>
  <div id="app-wrap"
:class="`${sidebar ? 'is-open' : 'is-collapsed'}`">
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
      <TailoredServersSidebar
        :toggle="() => ($data.sidebar = !$data.sidebar)"
      />
      <TailoredMessagingEnhancers />
      <div
        :class="`dynamic-content ${ui.fullscreen ? 'fullscreen-media' : ''}`"
      >
        <TailoredCoreStatusbar
          id="statusbar"
          :server="{
            name: 'Test Server',
            address: '0x0',
            desc: 'Just a test server',
          }"
          :user="$mock.users[0]"
        />
        <TailoredCoreMedia
          :fullscreen="ui.fullscreen"
          :users="$mock.callUsers"
          :max-viewable-users="10"
          :fullscreen-max-viewable-users="20"
        />
        <UiChatScroll
          :contents="ui.messages"
          :prevent-scroll-offset="500"
          :class="media.activeCall ? 'media-open' : ''"
          enable-wrap
        >
          <Nuxt />
        </UiChatScroll>
        <TailoredCoreChatbar />
      </div>
    </div>
    <TailoredCoreMobileNav v-if="$device.isMobile" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import Layout from '~/components/mixins/Layouts/Layout'
import { mobileSwipe } from '~/components/mixins/Swipe/Swipe'

export default Vue.extend({
  name: 'ServerLayout',
  mixins: [mobileSwipe, Layout],
  middleware: 'authenticated',
  data() {
    return {
      sidebar: true,
      unreadMessages: [{}],
    }
  },
  computed: {
    ...mapState(['ui', 'media']),
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
