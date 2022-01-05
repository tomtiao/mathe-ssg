<template>
  <div id="app">
    <Nuxt keep-alive />
    <div class="footer">
      扶朕起来朕还能学 ©2016-2019
      <br>Designed by
      <a href="https://github.com/eleflea">Eleflea</a>
      , made with
      <mu-icon value="favorite" size="10" />
    </div>
  </div>
</template>

<script>
import store from '@/store.js'
export default {
  name: 'DefaultLayout',
  async fetch () {
    let trees = []
    let updateTime = 0
    try {
      const resp = await store._fetchTrees()
      trees = resp.trees
      updateTime = resp.update
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`error when fetching data: ${err}`)
    } finally {
      this.$store.state.trees = trees
      this.$store.state.update = updateTime
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

#app::before {
  content: "";
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url(./assets/miku_back.jpg) no-repeat center;
  /* background-size: cover; */
  filter: grayscale(1) opacity(0.2);
}

.shadow {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

.app-container {
  padding-top: 56px;
  max-width: 1024px;
  margin: 0 auto;
}
@media only screen and (min-width: 600px) {
  .app-container {
    padding-top: 64px;
  }
}

.footer {
  font-size: 0.8rem;
  line-height: 1rem;
  margin: 1rem 0 .5rem 0;
}

.star em {
  left: 40px;
  right: unset;
}
</style>
