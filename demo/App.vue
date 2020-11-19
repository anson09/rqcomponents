<template>
  <div id="app">
    <!-- :config="config" -->
    <RqHeader :opacity="true" :before-logout="logout" @auth="log"> </RqHeader>

    <RqMaintenance date="2019-11-9 10:00" />
    <RqNotFound />
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
import { RqHeader, RqMaintenance, RqNotFound } from "../packages";
import "../packages/common/style";
/* --------  */

export default {
  name: "App",
  components: { RqHeader, RqMaintenance, RqNotFound },
  data() {
    return {
      config: {
        router: true,
        admin: true,
        ankaPrefix: "anka",
      },
    };
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
  background: white;
}
</style>
