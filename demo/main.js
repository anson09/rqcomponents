/* eslint-disable import/no-extraneous-dependencies */
import "core-js/stable";
import "regenerator-runtime/runtime";
/* build from lib polyfill */
// import "core-js/modules/es.promise";
// import "core-js/modules/es.object.assign";
import "normalize.css";
import Vue from "vue";
import App from "./App.vue";

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
