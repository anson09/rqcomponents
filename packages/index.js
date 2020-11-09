import RqHeader from "./header";
import RqFooter from "./footer";
import RqAnkaHeader from "./anka-header";
import RqLoggedHeader from "./logged-header";

const components = [RqHeader, RqFooter, RqAnkaHeader, RqLoggedHeader];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqFooter, RqAnkaHeader, RqLoggedHeader };

export default {
  install,
};
