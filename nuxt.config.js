import fs from 'fs/promises'

import axios from 'axios'
import store from './store.js'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'matheSsg',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/muse-ui.js',
    '@/plugins/muse-ui-progress.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Generate configuration: https://nuxtjs.org/docs/configuration-glossary/configuration-generate
  generate: {
    async routes () {
      let classes
      try {
        if ((await fs.stat('./trees.json')).isFile()) {
          classes = JSON.parse(await fs.readFile('./trees.json'))
        } else {
          throw new TypeError('trees.json not a file.')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error)
        classes = (await store._fetchTrees()).trees

        await fs.writeFile('trees.json', JSON.stringify(classes))
      }

      const sections = classes.map(({ name: className, data: chapters }) =>
        chapters.map(({ children: section }) =>
          section
            .map(({ id: tid, count }) => ({ className, tid, count }))
        )
      ).flat(2)

      const tkMap = {
        高等数学: 'gs',
        概率统计: 'gl',
        复变函数: 'fb',
        线性代数: 'xd'
      }

      const requests = sections.map(({ className, tid }) =>
        axios.get(`${store.API_LOCAL_BASE_URL}api/qlist`, {
          params: { tk: tkMap[className], tid }
        }).then(resp => resp.data)
      )

      const qlistData = (await Promise.all(requests)).map(resp => resp.data)

      const pagesRoutes = []
      {
        const zip = function* (a, b) {
          for (let i = 0; i < a.length; i++) {
            yield [a[i], b[i]]
          }
        }
        const range = function* ({ start = 0, end }) { while (start < end) { yield start++ } }

        const ITEM_PER_PAGE = 5

        for (const [{ className, tid }, { list, total, length }] of zip(sections, qlistData)) {
          const t = []
          const totalPage = Math.ceil(total / ITEM_PER_PAGE)
          if (total < 1) {
            t.push({
              route: `/page/${className}/${tid}/1`,
              payload: { total, list, length }
            })
          } else {
            for (const i of range({ start: 1, end: totalPage + 1 })) {
              t.push({
                route: `/page/${className}/${tid}/${i}`,
                payload: { total, list, length }
              })
            }
          }
          pagesRoutes.push(...t)
        }
      }

      return pagesRoutes
    },
    interval: 100,
    subFolders: false
  }
}
