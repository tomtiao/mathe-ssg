<template>
  <div class="select-list">
    <mu-list toggle-nested>
      <mu-list-item v-for="chapter in list" :key="chapter.id" button nested :open="false">
        <mu-list-item-title>{{ chapter.text }}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down" />
        </mu-list-item-action>
        <mu-list-item
          v-for="seg in chapter.children"
          :key="seg.id"
          slot="nested"
          :to="`/page/${tk}/${seg.id}/1`"
          button
          :ripple="false"
        >
          <mu-list-item-title>{{ seg.text }}</mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import store from '@/store.js'

export default {
  name: 'SelectList',
  data () {
    return {
      trees: []
    }
  },
  computed: {
    list () {
      const name = this.$route.params.lessonName
      if (this.trees.length === 0) {
        return []
      }
      for (const lesson of this.trees) {
        if (lesson.name === name) {
          return lesson.data
        }
      }
      // eslint-disable-next-line
      console.warn(`can not find lesson named '${name}'`);
      return []
    },
    tk () {
      return this.$route.params.lessonName
    }
  },
  created () {
    store.data.trees.then(t => (this.trees = t))
  }
}
</script>

<style scoped>
</style>
