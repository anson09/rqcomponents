<template>
  <div id="app">
    <RqLogin @after-login="handleAfterLogin" />
    <RqHeader
      :notification="notification"
      :before-logout="handleLogout"
      :home="home"
      :has-message="hasMessage"
      @create-workspce="handleCreateWorkspace"
      @switch-workspace="handleSwitchWorkspace"
      @switch-theme="handleSwitchTheme"
    >
    </RqHeader>
    <RqMaintenance :date="maintenanceDate" />
    <RqNotFound />
    <div class="rq-picture-example">
      <RqPicture
        :src="{
          avif: imgs.avif,
          webp: imgs.webp,
          fallback: imgs.png,
        }"
        class="picture"
        alt="picture"
      />
      <div class="description">
        <p>
          If you are viewing this page on Chrome later than version 85 or
          Firefox later than version 89,
        </p>
        <p>the picture left is in avif format and its size is 12KB.</p>
        <p>If you view using other browsers expect IE,</p>
        <p>the picture left is in webp format and its size is 27KB.</p>
        <p>If you use IE,</p>
        <p>the picture left is in png format and its size is 245KB.</p>
        <p>This is why we use this component.</p>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* build from lib */
/* full import */
// import {
//   RqHeader,
//   RqNotFound,
//   RqMaintenance,
//   RqLogin,
//   RqPicture,
// } from "../lib/index";
// import "../lib/theme/index.css";
// import "../lib/theme/base";
// import "../lib/theme/base.css";

/* partial import */
// import RqHeader from "../lib/rq-header";
// import "../lib/theme/rq-header.css";
// import RqNotFound from "../lib/rq-not-found";
// import "../lib/theme/rq-not-found.css";
// import RqMaintenance from "../lib/rq-maintenance";
// import "../lib/theme/rq-maintenance.css";
// import RqLogin from "../lib/rq-login";
// import "../lib/theme/rq-login.css";
// import RqPicture from "../lib/rq-picture";
// import "../lib/theme/base";
// import "../lib/theme/base.css";
/* --------  */

/* build from source */
import {
  RqHeader,
  RqMaintenance,
  RqNotFound,
  RqLogin,
  RqPicture,
} from "../packages";
import "../packages/common/style";
/* --------  */

// eslint-disable-next-line import/no-unresolved
import imgs from "./assets/example.*";

export default {
  name: "App",
  components: { RqHeader, RqMaintenance, RqNotFound, RqLogin, RqPicture },
  data() {
    return {
      home: {
        tooltipText: "回到测试首页",
        link: { path: "/test", outer: true },
      },
      hasMessage: false,
      maintenanceDate: "2019-11-9 10:00",
      notification: "notification",
      imgs,
    };
  },
  methods: {
    handleAfterLogin() {
      console.log("handle after login");
    },
    handleLogout() {
      console.log("do cometime before logout");
    },
    handleCreateWorkspace() {
      console.log("handle create workspace");
    },
    handleSwitchWorkspace(id) {
      console.log("handle switch workspace:", id);
    },
    handleSwitchTheme(theme) {
      console.log("handle switch theme:", theme);
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100vh;
  background: pink;

  .rq-picture-example {
    position: relative;

    .picture {
      position: absolute;
      top: 0;
      left: calc(50vw - 400px);
      width: 400px;
    }

    .description {
      position: absolute;
      top: 0;
      left: calc(50vw + 20px);
      width: 400px;
    }
  }
}
</style>
