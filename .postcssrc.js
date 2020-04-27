/* eslint-disable global-require, import/no-extraneous-dependencies */
const themifyOptions = {
  palette: {
    light: {
      "bg-white": "white",
      "bg-gray": "#f6f9fc",

      "container-bg": "#f7f8fa",
      text: "#666666",
      "text-gray-light": "#6d6d6d",
      "text-gray-lighter": "#c5c5c5",
      "text-hard": "#2a2a2a",
      "text-dark": "#333",
      "text-white": "#ffffff",
      "text-white-dark": "#e7e9f1",
      "text-disabled": "#a3a3a3",

      "rq-red": "#d74848",
      "rq-green": "#50bf80",

      "remove-hover-color": "#ed4a4a",
      "remove-active-color": "#bf3232",

      success: "#72cd26",

      highlight: "#1b5fc4",

      rqdata: "#4C469B",
      rqams: "#1B60C6",
      rqpro: "#D35353",
      rqoptimizer: "#21A2AC",

      "rqdata-bg": "#e6e6f0",
      "rqams-bg": "#ebeef3",
      "rqpro-bg": "#f1e7e7",
      "rqoptimizer-bg": "#ebf3f4",

      "border-disabled": "#dcdfe6",
      "button-dark": "#2a2a2a",
      "button-gray": "#e5eaf0",
      "button-pink-light": "#e9c7c7",
      "button-pink": "#ffa8a8",
      "button-disabled": "#f5f7fa",

      "avatar-bg": "#4768d35e",
      "mask-bg": "#0d1d540f",
      "mask-bg-dark": "#07112e47",
      "shadow-color": "rgba(152, 165, 185, 0.2)",
      "active-background-color": "white",
      "hover-background-color": "#f3f5f8",

      // theme
      border: "#d7dbe5",
      "border-gray": "#dfdfdf",
      "border-hover": "hsla(216, 76%, 44%, 0.8)",
      "background-color": "white",
      "hover-color": "hsla(216, 76%, 44%, 0.8)",
      "scrollbar-background": "#e6e9ed",
    },
    dark: {
      border: "#323d4e",
      "boder-hover": "hsla(220, 100%, 65%, 0.8)",
      text: "#a7b2be",
      "text-white": "#ffffff",
      "shadow-color": "rgba(0,0,0,0.2)",
      "hover-color": "#4575d3cc",
      highlight: "#4F89FF",
      "background-color": "#1A1C25",
      "active-background-color": "#282B35",
      "hover-background-color": "#2f3948",
      "border-gray": "#323c4c",
      "scrollbar-background": "#555d68",
    },
  },
  classPrefix: "theme-",
};

module.exports = {
  plugins: [
    require("autoprefixer")({ grid: true }),
    require("./themify").themify(themifyOptions),
  ],
};
