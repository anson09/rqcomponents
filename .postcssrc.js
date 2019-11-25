const themifyOptions = {
  palette: {
    light: {
      "bg-white": "white",
      "bg-gray": "#f6f9fc",

      "container-bg": "#f7f8fa",
      "text": "#666666",
      "text-gray-light": "#6d6d6d",
      "text-gray-lighter": "#c5c5c5",
      "text-hard": "#2a2a2a",
      "text-dark": "#333",
      "text-white": "#ffffff",
      "text-white-dark": "#e7e9f1",
      "text-disabled": "#a3a3a3",

      "rq-red": "#d74848",
      "rq-green": "#50bf80",

      "success": "#72cd26",

      "highlight": "#1b5fc4",

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
      "background-color": "white",

      // theme
      "border-hover": "hsla(216, 76%, 44%, 0.8)",
      "background-color": "white",
      "hover-color": "hsla(216, 76%, 44%, 0.8)"
    },
    dark: {
      "boder-hover": "hsla(220, 100%, 65%, 0.8)",
      "text": "#a7b2be",
      "shadow-color": "#0d0e1480",
      "hover-color": "#4575d3cc",
      "background-color": "#15171e"
    }
  },
  classPrefix: "theme-"
};

module.exports = {
  plugins: [
    require("autoprefixer")({ grid: true }),
    require("./themify").themify(themifyOptions)
  ]
};
