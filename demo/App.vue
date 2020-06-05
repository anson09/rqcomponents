<template>
  <div id="app">
    <RqHeader :opacity="true" :before-logout="logout" @auth="log"> </RqHeader>
    <RqFooter></RqFooter>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* build from lib */
import { RqHeader, RqFooter } from "../lib/rqcomponents";
import "../lib/theme/rqcomponents.css";
import "../lib/theme/base.css";
/* --------  */

/* build from source */
// import rqcomponents from "../packages";
// import "../packages/common/style";
/* --------  */

export default {
  name: "App",
  components: { RqHeader, RqFooter },
  mounted() {},
  methods: {
    log(...params) {
      console.log("auth", params);
    },
    logout(done) {
      console.log(done);
      done();
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
