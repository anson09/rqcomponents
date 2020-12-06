/* eslint-disable import/no-extraneous-dependencies */
import "core-js/stable";
import "regenerator-runtime/runtime";
import "normalize.css";
import Vue from "vue";
import App from "./App.vue";

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
