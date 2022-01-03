<template>
  <div class="settings">
    <Bar />
    <div class="app-container shadow">
      <div class="settings-container">
        <mu-form :model="options" label-position="left">
          <mu-form-item prop="switch" label="默认显示答案">
            <mu-switch v-model="options.showAnswer" />
          </mu-form-item>
          <mu-form-item prop="switch" label="默认标记答案">
            <mu-switch v-model="options.markAnswer" />
          </mu-form-item>
          <mu-form-item prop="slider" :label="`图片大小缩放：${options.imgScale}x`">
            <mu-slider v-model="options.imgScale" :min="0.5" :max="2" />
          </mu-form-item>
        </mu-form>
        <mu-divider />
        <mu-button class="bt" flat color="secondary" @click="reinit">
          重置所有设置
        </mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from '@/components/Bar.vue'

const DEFAULT_OPTIONS = {
  showAnswer: false,
  markAnswer: false,
  imgScale: 1
}

export default {
  name: 'SettingsPage',
  components: {
    Bar
  },
  data () {
    return {
      options: DEFAULT_OPTIONS
    }
  },
  watch: {
    options: {
      handler (to) {
        localStorage.setItem('options', JSON.stringify(to))
      },
      deep: true
    }
  },
  beforeMount () {
    this.options = this.initOptions()
  },
  methods: {
    reinit () {
      this.options = DEFAULT_OPTIONS
    },
    initOptions () {
      const c = localStorage
      if (c.getItem('options') === null) {
        c.setItem('options', JSON.stringify(DEFAULT_OPTIONS))
      }
      return JSON.parse(c.getItem('options'))
    }
  }
}
</script>

<style scoped>
.settings-container {
  padding: 1rem 3rem;
  text-align: left;
}
@media only screen and (max-width: 600px) {
  .settings-container {
    padding: 1rem;
  }
}

.bt {
  margin-top: 1rem;
}
</style>
