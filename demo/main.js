import "core-js/stable";
import "regenerator-runtime/runtime";
import VueRouter from "vue-router";
import Vue from "vue";
// import RqHeader from "../lib/rqheader";
// import "../lib/theme/rqheader.css";

import "../lib/theme/rqcomponents.css";
// import { RqHeader } from "../lib/rqcomponents.js";
import rqui from "../lib/rqcomponents.js";
// import "../packages/common/assets/icon/iconfont.css";
import "../lib/theme/base.css";

// dev
// import { RqHeader } from "../src";
import App from "./App.vue";
import "/../node_modules/normalize.css";

Vue.use(VueRouter);
// Vue.use(Rqui, {
//   RqHeader: {
//     router: true
//   }
// });
const cfg = {
  router: true,
  admin: true,
};
Vue.use(rqui, { RqHeader: cfg });
// Vue.use(RqHeader, cfg);

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  router: new VueRouter({
    mode: "history",
    routes: [{ path: "*", component: App }],
  }),
  render: (h) => h(App),
});
