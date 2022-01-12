<template>
  <div v-show="showBar" id="bar">
    <mu-appbar color="purple" z-depth="1">
      <mu-button slot="left" icon @click="open = !open">
        <mu-icon value="menu" />
      </mu-button>
      <mu-button slot="left" icon @click="$router.go(-1)">
        <mu-icon value="undo" />
      </mu-button>
      {{ title }}
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="false">
      <mu-list toggle-nested :value="activeItem">
        <slot>
          <LinkItem to="/" icon="home" title="主页" value="/" />
          <mu-divider />
          <LinkItem
            v-for="lesson in trees"
            :key="lesson.name"
            :to="'/lesson/' + lesson.name"
            icon="book"
            :title="lesson.name"
            :value="'/lesson/' + lesson.name"
          />
          <mu-divider />
        </slot>
        <LinkItem to="/settings" icon="settings" title="设置" value="/settings" />
        <LinkItem to="/about" icon="info" title="关于" value="/about" />
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import LinkItem from '@/components/LinkItem.vue'

function url2Name (route) {
  if (route.name === 'page-tk-tid-page') {
    return route.params.tid
  } else {
    return route.path
  }
}

let lastScrollPosition = 0

export default {
  name: 'BarComponent',
  components: {
    LinkItem
  },
  data () {
    return {
      title: '扶朕起来朕还能学',
      showBar: true,
      open: false,
      activeItem: '/'
    }
  },
  computed: {
    trees () {
      return this.$store.state.trees
    }
  },
  watch: {
    $route (to) {
      this.onRouteChange(to)
      this.open = false
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.onRouteChange(this.$route)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const p = window.scrollY
      if (p < 200) {
        this.showBar = true
        return
      }
      const delta = p - lastScrollPosition
      if (delta > 10) {
        this.showBar = false
      } else if (delta < -10) {
        this.showBar = true
      }
      lastScrollPosition = p
    },
    onRouteChange (route) {
      const r = this.$store.getters.url2title(route)
      this.title = r
      document.title = r
      this.activeItem = url2Name(route)
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  text-align: left;
}
</style>
