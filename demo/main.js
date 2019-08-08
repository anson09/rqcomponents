import Vue from "vue";
// import {RqHeader} from "../dist/rqcomponents.cjs";
// dev
import {RqHeader} from "../src";
import App from "./App.vue";
import "/../node_modules/normalize.css";
import VueRouter from "vue-router";

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
