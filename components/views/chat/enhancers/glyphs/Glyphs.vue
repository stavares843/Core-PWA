<template src="./Glyphs.html"></template>
<script lang="ts">
import Vue from 'vue'
import VirtualList from 'vue-virtual-scroll-list'
import PackGroup from './pack/PackGroup.vue'
import { GlyphPackInfo } from '~/types/glyphs'

export default Vue.extend({
  components: { VirtualList },
  data() {
    return {
      filteredGlyphs: Object.values(this.$mock.glyphs),
      searchText: '',
      selectedPack: null,
      packGroup: PackGroup,
    }
  },
  mounted() {
    console.log('filteredGlyphs', this.filteredGlyphs)
  },
  watch: {
    searchText() {
      this.filter(this.searchText)
    },
  },
  methods: {
    filter(filterValue: any) {
      this.filteredGlyphs = Object.values(this.$mock.glyphs).filter(
        (pack) =>
          (pack as GlyphPackInfo).name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1,
      )
    },
  },
})
</script>
<style lang="less" src="./Glyphs.less"></style>
