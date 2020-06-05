import "core-js/stable";
import "regenerator-runtime/runtime";
import "normalize.css";
import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";

Vue.use(VueRouter);

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  router: new VueRouter({
    mode: "history",
    routes: [{ path: "*", component: App }],
  }),
  render: (h) => h(App),
});
