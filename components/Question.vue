<template>
  <div v-if="imgs.length" class="question">
    <mu-flex class="question-container" direction="column" align-items="center">
      <mu-flex class="question-bar" direction="row" align-items="start">
        <mu-badge :content="`#${no}`" color="primary" />
        <mu-badge :content="diff" :color="diffColor" />
      </mu-flex>
      <DraggableImg
        v-for="(o, key) in imgs.slice(0,5)"
        :key="key"
        :src="o.src"
        :is-answer="o.isAnswer"
        :img-scale="options.imgScale"
        :green="options.markAnswer && o.isAnswer === 1"
      />
      <DraggableImg
        v-if="options.showAnswer"
        class="no-divider"
        :src="imgs.length && imgs[5].src"
        :is-answer="-1"
        :img-scale="options.imgScale"
        :pointer="true"
        @click.native="toggleAnswer"
      />
    </mu-flex>
    <Crash v-show="!options.showAnswer" @click.native="toggleAnswer" />
  </div>
</template>

<script>
import DraggableImg from '@/components/DraggableImg.vue'
import Crash from '@/components/Crash.vue'

// ref: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle (a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export default {
  name: 'QuestionComponent',
  components: {
    DraggableImg,
    Crash
  },
  props: ['name', 'no'],
  data () {
    return {
      tk: '',
      diff: '',
      options: {
        showAnswer: false,
        markAnswer: false,
        imgScale: 1
      },
      imgs: []
    }
  },
  async fetch () {
    this.imgs.length = 0
    const imgs = []
    try {
      const resp = await this.$axios.get(`${this.$store.state.API_LOCAL_BASE_URL}api/question`, {
        params: { name: this.name }
      })

      const d = resp.data
      if (d.code === 0) {
        for (const k of ['tk', 'diff']) {
          this[k] = d.data[k]
        }
        {
          const concatBase64 = base64 => `data:image/png;base64,${base64}`
          const range = function* ({ start = 0, end }) { while (start < end) { yield start++ } }
          for (const i of range({ end: 6 })) {
            imgs.push({
              src: concatBase64(d.data[`img${i}`]),
              isAnswer: 0
            })
          }
        }
        imgs[0].isAnswer = -1
        imgs[5].isAnswer = -1
        // set question answer
        imgs[d.data.answer].isAnswer = 1
        // shuffle options
        imgs.splice(1, 4, ...shuffle(imgs.slice(1, 5)))
        this.imgs = imgs
      } else {
        throw new Error(d.msg)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('question:', error)
    } finally {
      this.$emit('fetch-over')
    }
  },
  computed: {
    diffColor () {
      return {
        Averge: 'orange',
        Easy: 'green',
        Hard: 'red'
      }[this.diff]
    }
  },
  watch: {
    name () {
      this.initOptions()
    }
  },
  beforeMount () {
    this.initOptions()
  },
  methods: {
    initOptions () {
      const o = localStorage.getItem('options')
      if (o === null) {
        this.options = {
          showAnswer: false,
          markAnswer: false,
          imgScale: 1
        }
      } else {
        this.options = JSON.parse(o)
      }
    },
    toggleAnswer () {
      this.options.showAnswer = !this.options.showAnswer
    }
  }
}
</script>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
}

.question-container {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  background-color: white;
  width: 100%;
}

.question-container > * {
  width: 100%;
  border-bottom: 1px dashed gray;
}

.question-bar {
  padding: 0.5rem;
}

.question-bar > div {
  margin-right: 0.5rem;
}

.no-divider {
  border-bottom: none;
}
</style>
