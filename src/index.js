import RqHeader from "../packages/header";

const components = [RqHeader];

const install = function (Vue, opt = {}) {
  components.forEach((component) => {
    component.install(Vue, opt[component.name]);
  });
};

export { RqHeader };

export default {
  install,
};
