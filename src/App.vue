<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- <div id="yohoho" data-kinopoisk="326"></div> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue"
export default {
  components: { Header },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {
  width: 100%;
  height: 100%;
  /* transform: translateX(-100%); */
}
</style>
