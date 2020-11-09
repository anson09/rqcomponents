<template>
  <div id="app">
    <!-- :config="config" -->
    <RqHeader :opacity="true" :before-logout="logout" @auth="log"> </RqHeader>
    <RqAnkaHeader :opacity="true" :before-logout="logout" @auth="log">
      <template slot="notification">a test a test a test</template>
    </RqAnkaHeader>
    <RqLoggedHeader />
    <RqFooter></RqFooter>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* build from lib */
// import { RqHeader, RqFooter } from "../lib/rqcomponents";
// import "../lib/theme/base";
// import "../lib/theme/base.css";
// import "../lib/theme/rqcomponents.css";
/* --------  */

/* build from source */
import { RqFooter, RqAnkaHeader, RqHeader, RqLoggedHeader } from "../packages";
import "../packages/common/style";
/* --------  */

export default {
  name: "App",
  components: { RqFooter, RqAnkaHeader, RqHeader, RqLoggedHeader },
  data() {
    return {
      config: {
        router: true,
        admin: true,
        ankaPrefix: "anka",
      },
    };
  },
  watch: {
    $route() {
      console.log("watch route", this.$route);
    },
  },
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
