
import "core-js/stable";
import "regenerator-runtime/runtime";
import VueRouter from "vue-router";
import Vue from "vue";
// import {RqHeader} from "../dist/rqcomponents.cjs";
// import "../dist/rqcomponents.esm.css";
// import "../packages/common/assets/icon/iconfont.css";

// dev
import {RqHeader} from "../src";
import App from "./App.vue";
import "/../node_modules/normalize.css";

Vue.use(VueRouter);
// Vue.use(Rqui, {
//   RqHeader: {
//     router: true
//   }
// });
Vue.use(RqHeader,  {
  router: true,
  admin: true
});

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  router: new VueRouter({
    mode: "history",
    routes: [
      { path: "*", component: App }
    ]
  }),
  render: h => h(App)
});
