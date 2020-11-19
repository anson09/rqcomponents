<template>
  <div id="app">
    <RqHeader
      :notification="notification"
      :before-logout="handleLogout"
      @create-workspce="handleCreateWorkspace"
      @switch-workspace="handleSwitchWorkspace"
    >
    </RqHeader>
    <RqMaintenance :date="maintenanceDate" />
    <RqNotFound />
  </div>
</template>

<script>
/* eslint-disable no-console */
/* build from lib */
/* full import */
// import { RqHeader, RqNotFound, RqMaintenance } from "../lib/rqcomponents";
// import "../lib/theme/base";
// import "../lib/theme/rqcomponents.css";

/* partial import */
// import RqHeader from "../lib/rq-header";
// import "../lib/theme/rq-header.css";
// import RqNotFound from "../lib/rq-not-found";
// import "../lib/theme/rq-not-found.css";
// import RqMaintenance from "../lib/rq-maintenance";
// import "../lib/theme/rq-maintenance.css";

// import "../lib/theme/base.css";
/* --------  */

// /* build from source */
import { RqHeader, RqMaintenance, RqNotFound } from "../packages";
import "../packages/common/style";
/* --------  */

export default {
  name: "App",
  components: { RqHeader, RqMaintenance, RqNotFound },
  data() {
    return {
      maintenanceDate: "2019-11-9 10:00",
      notification: "notification",
    };
  },

  mounted() {},
  methods: {
    handleLogout(done) {
      console.log("do cometime before logout");
      done();
    },
    handleCreateWorkspace() {
      console.log("handle create workspace");
    },
    handleSwitchWorkspace(id) {
      console.log("handle switch workspace", id);
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
