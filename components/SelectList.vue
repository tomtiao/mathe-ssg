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
          button
          :to="`/page/${tk}/${seg.id}/1`"
          :ripple="false"
        >
          <mu-list-item-title
            style="display: block;"
          >
            {{ seg.text }}
          </mu-list-item-title>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
export default {
  name: 'SelectList',
  computed: {
    trees () {
      return this.$store.state.trees
    },
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
      return []
    },
    tk () {
      return this.$route.params.lessonName
    }
  }
}
</script>

<style scoped>
</style>
