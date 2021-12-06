<template src="./NewMessagesNotification.html" />
<script lang="ts">
import Vue from 'vue'
import { XIcon } from 'satellite-lucide-icons'

export default Vue.extend({
  components: {
    XIcon,
  },
  props: {
    text: {
      type: String,
      default() {
        return ''
      },
      required: false,
    },
  },
})
</script>
<style scoped lang="less" src="./NewMessagesNotification.less"></style>
