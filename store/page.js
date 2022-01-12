export const state = () => ({
  total: 0,
  list: [],
  len: 0,
  current: 1
})

export const mutations = {
  update (state, newData) {
    for (const key of Object.keys(state)) {
      state[key] = newData[key]
    }
  },
  updateCurrent (state, page) {
    state.current = page
  }
}
