import RqHeader from "./header";
import RqFooter from "./footer";
import RqLoggedHeader from "./logged-header";

const components = [RqHeader, RqFooter, RqLoggedHeader];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqFooter, RqLoggedHeader };

export default {
  install,
};
