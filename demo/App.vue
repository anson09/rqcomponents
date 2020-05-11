<template>
  <div id="app">
    <RqHeader :opacity="true" @auth="log"> </RqHeader>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: "App",
  mounted() {},
  methods: {
    log(...params) {
      console.log("auth", params);
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100vh;
  background: pink;
}
</style>
