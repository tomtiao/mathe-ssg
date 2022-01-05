export const state = () => ({
  trees: [],
  update: 0
})

export const mutations = {
  updateTrees (state, newTrees) {
    state.trees.lenght = 0
    state.trees.push(...newTrees)
  },
  updateTime (state, timestamp) {
    state.update = timestamp
  }
}
