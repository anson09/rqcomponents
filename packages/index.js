import RqHeader from "./header";
import RqFooter from "./footer";

const components = [RqHeader, RqFooter];

const install = function (Vue, opt = {}) {
  components.forEach((component) => {
    component.install(Vue, opt[component.name]);
  });
};

export { RqHeader, RqFooter };

export default {
  install,
};
