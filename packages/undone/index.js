import "element-ui/lib/theme-chalk/base.css";
import "element-ui/lib/theme-chalk/dialog.css";
import UndoneDialog from "./src/UndoneDialog.vue";

UndoneDialog.install = function(Vue, option) {
  Object.defineProperty(Vue.prototype, "$undone", {
    get() {
      const dialog = function(params) {
        const data = UndoneDialog.data();
        Object.keys(data).forEach(key => {
          if (params[key]) {
            data[key] = params[key];
          }
        });
        const Constructor = Vue.extend(UndoneDialog);
        const instance = new Constructor({
          el: document.createElement("div"),
          data
        });
        document.getElementById("app").appendChild(instance.$el);
      };
      return dialog;
    }
  });
}

export default UndoneDialog;
