import Vue from "vue";
import Rqui from "../src";
import App from "./App.vue";
import "/../node_modules/normalize.css";

Vue.use(Rqui);

/* eslint-disable-next-line no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});
