import Picture from "./Picture.vue";

Picture.install = function (Vue) {
  Vue.component(Picture.name, Picture);
};

export default Picture;
