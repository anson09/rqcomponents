/* eslint-disable global-require */

const light = {
  "--primary-color": "hsl(216, 79%, 53%)", //品牌色
  "--primary-color-1": "hsla(216, 79%, 53%, 0.1)",
  "--primary-color-2": "hsla(216, 79%, 53%, 0.2)",
  "--primary-color-3": "hsla(216, 79%, 53%, 0.3)",
  "--primary-color-4": "hsla(216, 79%, 53%, 0.4)",
  "--primary-color-5": "hsla(216, 79%, 53%, 0.5)",
  "--primary-color-6": "hsla(216, 79%, 53%, 0.6)",
  "--primary-color-7": "hsla(216, 79%, 53%, 0.7)",
  "--primary-color-8": "hsla(216, 79%, 53%, 0.8)",
  "--primary-color-9": "hsla(216, 79%, 53%, 0.9)",

  //text-color//
  "--text-remind": "hsl(0, 0%, 3%)",
  "--text-primary": "hsl(0, 0%, 20%)", //浅色底字体色值
  "--text-normal": "hsla(220, 3%, 39%, 1)", //常规字体色值
  "--text-secondary": "hsl(0, 0%, 64%)", //不重要字体色值
  "--text-gray": "hsla(217, 19%, 67%, 1)", // logged icon color

  "--text-button": "hsl(0, 0%, 100%)", // logged road show button color
  "--text-tooltip": "hsl(220, 3%, 19%)",
  "--text-white": "hsl(0, 0%, 100%)", //深色底字体色值
  "--text-white-8": "hsla(0, 0%, 100%, 0.8)",

  //background-color//
  "--background-final": "hsl(0, 0%, 100%)", // 网站背景色
  "--background-primary": "hsl(220, 20%, 97%)", //一级背景色
  "--background-secondary": "hsl(0, 0%, 94%)", //二级背景色
  "--background-white": "hsl(0, 0%, 100%)",
  "--background-minor": "hsl(218, 100%, 98%)",
  "--background-dark": "hsl(216, 70%, 30%)",
  "--background-active": "hsl(216, 89%, 41%)",
  "--background-gray": "hsl(223, 3%, 42%)",

  "--warning-background": "hsl(49, 100%, 50%)",
  "--warning-background-secondary": "hsl(41, 98%, 52%)",
  "--succeed-color": "hsla(146, 48%, 49%, 1)",
  "--remove-hover-color": "hsl(0, 82%, 61%)",
  "--remove-active-color": "hsl(0, 59%, 47%)",

  //border-color//
  "--border-primary": "hsl(0, 0%, 89%)", //浅色底分割线

  //shdow-color//
  "--shadow-primary": "hsla(0, 0%, 20%, 0.1)",
  "--shadow-button": "hsla(222, 8%, 24%, 0.29)",
  "--border-tooltip": "hsl(0, 0%, 100%)",
};

const dark = {
  //brand-color//
  "--primary-color": "hsl(220, 100%, 65%)", //品牌色
  "--primary-color-1": "hsla(220, 100%, 65%, 0.1)",
  "--primary-color-2": "hsla(220, 100%, 65%, 0.2)",
  "--primary-color-3": "hsla(220, 100%, 65%, 0.3)",
  "--primary-color-4": "hsla(220, 100%, 65%, 0.4)",
  "--primary-color-5": "hsla(220, 100%, 65%, 0.5)",
  "--primary-color-6": "hsla(220, 100%, 65%, 0.6)",
  "--primary-color-7": "hsla(220, 100%, 65%, 0.7)",
  "--primary-color-8": "hsla(220, 100%, 65%, 0.8)",
  "--primary-color-9": "hsla(220, 100%, 65%, 0.9)",

  //text-color//
  "--text-primary": "hsl(215, 21%, 89%)", //主字体色值
  "--text-normal": "hsl(211, 15%, 70%)", //常规字体色值
  "--text-secondary": "hsl(211, 10%, 50%)", //不重要字体色值
  "--text-remind": "hsl(0, 0%, 100%)",
  "--text-button": "hsla(220, 3%, 19%, 1)",

  //background-color//
  "--background-primary": "hsl(226, 16%, 16%)", //一级背景色
  "--background-secondary": "hsl(229, 18%, 12%)", //二级背景色
  "--background-final": "hsla(226, 14%, 18%, 1)", //网站背景色
  "--background-minor": "hsla(226, 14%, 24%, 1)",

  "--remove-hover-color": "hsl(0, 82%, 61%)",
  "--remove-active-color": "hsl(0, 59%, 47%)",
  "--succeed-color": "hsla(146, 48%, 49%, 1)",
  "--warning-background-secondary": "hsl(222, 60%, 37%)",

  //border-color//
  "--border-primary": "hsl(216, 22%, 25%)", //主要分割线

  //projection-color//
  "--shadow-primary": "hsl(0, 0%, 8%)",
  "--shadow-button": "hsla(222, 8%, 24%, 0.29)",
  "--text-gray": "hsla(217, 19%, 67%, 1)",
};

const themifyOptions = {
  palette: {
    light: {
      "--white": light["--text-white"],
      "--warning-color": light["--text-primary"],
      "--dropdown-hover-background": light["--primary-color-1"],
      "--background-white-hover": light["--background-primary"],
      "--shadow-dropdown": dark["--primary-color-2"],
      ...light,
    },

    dark: {
      "--white": light["--text-white"],
      "--dropdown-hover-background": light["--primary-color-2"],
      "--warning-background": light["--primary-color"],
      "--warning-color": light["--text-white-8"],
      "--background-white-hover": light["--primary-color-2"],
      "--background-dark": light["--background-final"],
      "--text-white": light["--text-tooltip"],
      "--text-tooltip": dark["--text-normal"],
      "--border-tooltip": dark["--primary-color-8"],
      "--background-gray": light["--background-final"],
      "--shadow-dropdown": dark["--primary-color-2"],
      "--background-active": light["--primary-color"],

      ...dark,
    },
  },
  classPrefix: "theme-",
};

module.exports = {
  plugins: [
    require("autoprefixer")({ grid: true }),
    require("./build/themify").themify(themifyOptions),
  ],
};
