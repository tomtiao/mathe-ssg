<template>
  <div class="page">
    <Bar>
      <mu-list-item button nested :open="false">
        <mu-list-item-action>
          <mu-icon value="star" />
        </mu-list-item-action>
        <mu-list-item-title>题库</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down" />
        </mu-list-item-action>
        <LinkItem
          v-for="lesson in trees"
          :key="lesson.name"
          slot="nested"
          :to="'/lesson/' + lesson.name"
          icon="book"
          :title="lesson.name"
          :value="'/lesson/' + lesson.name"
        />
      </mu-list-item>
      <mu-divider />
      <LinkItem
        v-for="seg in segList"
        :key="seg.id"
        :to="`/page/${$route.params.tk}/${seg.id}/1`"
        :title="seg.text"
        :value="seg.id"
      />
      <mu-divider />
      <LinkItem to="/" icon="home" title="主页" value="/" />
    </Bar>
    <div class="app-container">
      <Question
        v-for="(tid, key) in list"
        :key="key"
        class="question"
        :name="tid"
        :no="(current - 1) * 5 + key + 1"
        @fetch-over="onFetchOver"
      />
      <mu-flex direction="column" justify-content="center" align-items="center">
        <!-- <mu-pagination :page-size="5" :total="total" :current="current" @update:current="onChangePage" /> -->
        <div class="links">
          <NuxtLink
            v-for="i of new Array(Math.floor(total / 5)).keys()"
            :key="`/page/${$route.params.tk}/${$route.params.tid}/${i+1}`"
            :to="`/page/${$route.params.tk}/${$route.params.tid}/${i+1}`"
          >
            {{ i+1 }}
          </NuxtLink>
        </div>
        <mu-flex direction="row" justify-content="center">
          <NuxtLink
            v-if="preNext[0]"
            :to="preNext[0] ? `/page/${$route.params.tk}/${preNext[0].id}/1` : null"
          >
            <mu-button
              class="seg-jump"
              flat
              :disabled="!preNext[0]"
            >
              <mu-icon left value="keyboard_arrow_left" />
              {{ preNext[0].text }}
            </mu-button>
          </NuxtLink>
          <NuxtLink
            v-if="preNext[1]"
            :to="preNext[1] ? `/page/${$route.params.tk}/${preNext[1].id}/1` : null"
          >
            <mu-button
              class="seg-jump"
              flat
              :disabled="!preNext[1]"
            >
              {{ preNext[1].text }}
              <mu-icon right value="keyboard_arrow_right" />
            </mu-button>
          </NuxtLink>
        </mu-flex>
      </mu-flex>
    </div>
  </div>
</template>

<script>
import Bar from '@/components/Bar.vue'
import Question from '@/components/Question.vue'
import LinkItem from '@/components/LinkItem.vue'

export default {
  name: 'QuestionPage',
  components: {
    Bar,
    Question,
    LinkItem
  },
  // beforeRouteUpdate (to, from, next) {
  //   const { tk, tid, page } = to.params
  //   console.error(to.params)
  //   const current = isNaN(parseInt(page)) ? 1 : parseInt(page)

  //   this.$store.dispatch('qlist', { tk, tid, page: current })
  //     .then((data) => {
  //       console.error(to.params)
  //       for (const key of Object.keys(data)) {
  //         this[key] = data[key]
  //       }
  //       next()
  //     })
  //     // eslint-disable-next-line no-console
  //     .catch(err => console.error(`beforeRouteUpdate: ${err}`))
  // },
  async asyncData ({ store, payload, params, error }) {
    if (payload) {
      return {
        total: payload.total,
        list: payload.list,
        len: payload.length
      }
    }

    const { tk, tid, page } = params

    const current = isNaN(parseInt(page)) ? 1 : parseInt(page)

    let data = {}
    try {
      const resp = await store.dispatch('qlist', { tk, tid, page: current })

      data = resp
    } catch (err) {
      error(err)
    }

    return {
      ...data
    }
  },
  data () {
    return {
      // number of questions in this chapter
      total: 0,
      // number of questions in current page
      len: 0,
      list: [],
      current: 1,
      fetchCount: 0
    }
  },
  computed: {
    trees () {
      return this.$store.state.trees
    },
    segList () {
      const { tk, tid } = this.$route.params
      if (tk == null) { return [] }
      return this.$store.getters.getSegs(tk, tid)
    },
    preNext () {
      const { tk, tid } = this.$route.params
      if (tk == null) { return [null, null] }
      return this.$store.getters.getSiblingSegs(tk, tid)
    }
  },
  // created () {
  //   const { tk, tid, page } = this.$route.params
  //   const current = isNaN(parseInt(page)) ? 1 : parseInt(page)
  //   this.current = current
  //   this.$store.dispatch('qlist', { tk, tid, page: current })
  //     .then((data) => {
  //       for (const key of Object.keys(data)) {
  //         this[key] = data[key]
  //       }
  //     })
  // },
  methods: {
    onChangePage (page) {
      const params = this.$route.params
      params.page = page
      this.$router.push({ name: 'page-tk-tid-page', params })
    },
    onFetchOver () {
      this.fetchCount++
      if (this.fetchCount === this.len) {
        this.$progress.done()
      }
    },
    async fetchData () {
      await this.fetchQuestions()
      this.fetchCount = 0
    }
  }
}
</script>

<style scoped>
.question {
  margin: 0 auto 0.75rem auto;
}
@media only screen and (max-width: 600px) {
  .question {
    margin-bottom: 7px;
  }
}

.seg-jump {
  max-width: 50vw;
  min-height: 2rem;
  height: initial;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
}
</style>
