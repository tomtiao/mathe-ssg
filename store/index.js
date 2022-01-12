const API_BASE_URL = 'https://api.neumathe.xyz:8181/'
const API_LOCAL_BASE_URL = 'http://localhost:2333/'

export const state = () => ({
  API_BASE_URL,
  API_LOCAL_BASE_URL,
  trees: [],
  update: 0
})

export const getters = {
  getSegs: state => (tk, tid) => {
    if (state.trees.length === 0) {
      return []
    }
    for (const lesson of state.trees) {
      if (lesson.name === tk) {
        const cid = lesson.data
          .map(c => c.children.map(t => t.id).includes(tid))
          .indexOf(true)
        return lesson.data[cid].children
      }
    }
    // eslint-disable-next-line
    console.warn(`can not find lesson named '${tk}'`);
    return []
  },
  getSiblingSegs: (_, getters) => (tk, tid) => {
    const segs = getters.getSegs(tk, tid)
    const l = segs.length
    if (l === 0) {
      return [null, null]
    }
    const index = segs.map(v => v.id).indexOf(tid)
    switch (index) {
      case -1:
        // eslint-disable-next-line
        console.warn(`can not find segment with id '${tid}'`);
        return [null, null]
      case 0:
        return [null, segs[1]]
      case l - 1:
        return [segs[l - 2], null]
      default:
        return [segs[index - 1], segs[index + 1]]
    }
  },
  getSegName: (_, getters) => (tk, tid) => {
    const segs = getters.getSegs(tk, tid)
    if (segs.length === 0) {
      return ''
    }
    const index = segs.map(v => v.id).indexOf(tid)
    if (index === -1) {
      // eslint-disable-next-line
      console.warn(`can not find segment with id '${tid}'`);
      return ''
    }
    return segs[index].text
  },
  url2title: (_, getters) => (route) => {
    const base = '扶朕起来朕还能学'
    let l = []
    switch (route.name) {
      case 'index':
        l = ['主页', base]
        break
      case 'page-tk-tid-page':
        l = [
          getters.getSegName(route.params.tk, route.params.tid),
          route.params.tk,
          base
        ]
        break
      case 'lesson':
        l = [route.params.lessonName, base]
        break
      case 'settings':
        l = ['设置', base]
        break
      case 'about':
        l = ['关于', base]
        break

      default:
        break
    }
    return l.join(' - ')
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch, state }) {
    if (state.trees.length > 0) { return }
    if (state.update > 0) { return }
    let trees = []
    let updateTime = 0

    try {
      const resp = await dispatch('fetchTrees')
      trees = resp.trees
      updateTime = resp.update
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`error when fetching data: ${err}`)
    }

    commit('updateTrees', trees)
    commit('updateTime', updateTime)
  },
  async fetchTrees () {
    return await this.$axios
      .get(`${API_BASE_URL}api/clist`)
      .then((resp) => {
        const d = resp.data
        if (d.code === 0) {
          return d.data
        } else {
          throw new Error(d.msg)
        }
      })
    // eslint-disable-next-line
        .catch(e => console.warn(e));
  },
  async qlist ({ state }, { tk, tid, page }) {
    const tkMap = {
      高等数学: 'gs',
      概率统计: 'gl',
      复变函数: 'fb',
      线性代数: 'xd'
    }

    let result = {}
    try {
      const resp = await this.$axios
        .get(`${state.API_LOCAL_BASE_URL}api/qlist`, {
          params: { tk: tkMap[tk], tid, page, per: 5 }
        })

      const d = resp.data

      if (d.code === 0) {
        result = {
          total: d.data.total,
          list: d.data.list,
          len: d.data.length
        }
      } else {
        throw new Error(d.msg)
      }
    } catch (err) {
      // eslint-disable-next-line
      console.warn('qlist:', err)
    }
    return result
  }
}

export const mutations = {
  updateTrees (state, newTrees) {
    state.trees.lenght = 0
    state.trees.push(...newTrees)
  },
  updateTime (state, timestamp) {
    state.update = timestamp
  }
}
