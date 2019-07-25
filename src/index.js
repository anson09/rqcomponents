import RqHeader from "../packages/header";

const components = [
  RqHeader
]

const install = function(Vue, opt={}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install
}
