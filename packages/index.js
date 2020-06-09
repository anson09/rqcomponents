import RqHeader from "./header";
import RqFooter from "./footer";

const components = [RqHeader, RqFooter];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqFooter };

export default {
  install,
};
