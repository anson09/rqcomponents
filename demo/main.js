import "core-js/stable";
import "regenerator-runtime/runtime";
import "normalize.css";
import Vue from "vue";
import VueRouter from "vue-router";

/* build from lib */
// import RqHeader from "../lib/rqheader";
// import { RqHeader } from "../lib/rqcomponents";
import rqcomponents from "../lib/rqcomponents";

// import "../lib/theme/rqheader.css";
import "../lib/theme/rqcomponents.css";
import "../lib/theme/base.css";
/* --------  */

/* build from source */
// import { RqHeader } from "../packages";
// import "../packages/common/style";
/* --------  */

import App from "./App.vue";

Vue.use(VueRouter);

Vue.use(rqcomponents, {
  RqHeader: {
    router: true,
    admin: true,
  },
});

// Vue.use(RqHeader, {
//   router: true,
//   admin: true,
// });

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  router: new VueRouter({
    mode: "history",
    routes: [{ path: "*", component: App }],
  }),
  render: (h) => h(App),
});
