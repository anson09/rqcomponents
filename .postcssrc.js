/* eslint-disable global-require */

const product = {
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

  //product-color//
  "--rqdata-product-color": "hsl(247, 58%, 42%)", //rqdata主题色
  "--rqdata-product-color-1": "hsla(247, 58%, 42%, 0.1)",
  "--rqdata-product-color-2": "hsla(247, 58%, 42%, 0.2)",
  "--rqdata-product-color-9": "hsla(247, 58%, 42%, 0.9)",

  "--rqams-product-color": "hsl(216, 76%, 44%)", //rqams主题色
  "--rqams-product-color-1": "hsla(216, 76%, 44%, 0.1)",
  "--rqams-product-color-2": "hsla(216, 76%, 44%, 0.2)",
  "--rqams-product-color-9": "hsla(216, 76%, 44%, 0.9)",

  "--rqoptimizer-product-color": "hsl(184, 84%, 29%)", //rqoptimizer主题色
  "--rqoptimizer-product-color-1": "hsla(184, 84%, 29%, 0.1)",
  "--rqoptimizer-product-color-2": "hsla(184, 84%, 29%, 0.2)",
  "--rqoptimizer-product-color-9": "hsla(184, 84%, 29%, 0.9)",

  "--rqsdk-product-color": "hsl(218, 64%, 29%)", //rqsdk主题色
  "--rqsdk-product-color-1": "hsl(218, 63%, 29%, 0.1)",
  "--rqsdk-product-color-2": "hsl(218, 63%, 29%, 0.2)",
  "--rqsdk-product-color-9": "hsl(218, 63%, 29%, 0.9)",

  "--rqfactor-product-color": "hsl(41, 98%, 52%)", //rqoptimizer主题色
  "--rqfactor-product-color-1": "hsla(41, 98%, 52%, 0.1)",
  "--rqfactor-product-color-2": "hsla(41, 98%, 52%, 0.2)",
  "--rqfactor-product-color-9": "hsla(41, 98%, 52%, 0.9)",

  "--rqalphaplus-product-color": "hsl(1, 74%, 54%)", //rqalphaplus主题色
  "--rqalphaplus-product-color-1": "hsl(1, 74%, 54%, 0.1)",
  "--rqalphaplus-product-color-2": "hsl(1, 74%, 54%, 0.2)",
  "--rqalphaplus-product-color-9": "hsl(1, 74%, 54%, 0.9)",

  "--quant-product-color": "hsl(0, 59%, 58%)", //ricequant主题色
  "--quant-product-color-1": "hsla(0, 59%, 58%, 0.1)",
  "--quant-product-color-2": "hsla(0, 59%, 58%, 0.2)",
  "--quant-product-color-9": "hsla(0, 59%, 58%, 0.9)",

  //text-color//
  "--text-remind": "hsl(0, 0%, 3%)",
  "--text-primary": "hsl(0, 0%, 20%)", //浅色底字体色值
  "--text-important": "hsl(0, 0%, 29%)",
  "--text-normal": "hsla(220, 3%, 39%, 1)", //常规字体色值
  "--text-secondary": "hsl(0, 0%, 64%)", //不重要字体色值
  "--text-white": "hsl(0, 0%, 100%)", //深色底字体色值
  "--text-white-1": "hsla(0, 0%, 100%, 0.1)",
  "--text-white-2": "hsla(0, 0%, 100%, 0.2)",
  "--text-white-3": "hsla(0, 0%, 100%, 0.3)",
  "--text-white-4": "hsla(0, 0%, 100%, 0.4)",
  "--text-white-5": "hsla(0, 0%, 100%, 0.5)",
  "--text-white-6": "hsla(0, 0%, 100%, 0.6)",
  "--text-white-7": "hsla(0, 0%, 100%, 0.7)",
  "--text-white-8": "hsla(0, 0%, 100%, 0.8)",
  "--text-white-9": "hsla(0, 0%, 100%, 0.9)",

  //background-color//
  "--background-final": "hsl(0, 0%, 100%)", // 网站背景色
  "--background-primary": "hsl(220, 20%, 97%)", //一级背景色
  "--background-secondary": "hsl(0, 0%, 94%)", //二级背景色
  "--background-white": "hsl(0, 0%, 100%)",
  "--background-black": "hsl(0, 0%, 0%)",
  "--background-minor": "hsl(216, 20%, 95%)",

  //border-color//
  "--border-primary": "hsl(0, 0%, 89%)", //浅色底分割线

  //shdow-color//
  "--shadow-primary": "hsla(0, 0%, 20%, 0.1)",
  "--shadow-secondary": "hsla(0, 0%, 20%, 0.05)",
  "--shadow-button": "hsla(222, 8%, 24%, 0.29)",
  "--shadow-dropdown": "hsla(220, 100%, 65%, 0.2)",
  "--shadow-container": "hsla(216, 76%, 44%, 0.1)",
  "--text-gray": "hsl(217, 19, 67, 1)",
};

const light = {
  "--light-primary-color": "hsl(216, 76%, 44%)", //品牌色
  "--light-primary-color-1": "hsla(216, 76%, 44%, 0.1)",
  "--light-primary-color-2": "hsla(216, 76%, 44%, 0.2)",
  "--light-primary-color-3": "hsla(216, 76%, 44%, 0.3)",
  "--light-primary-color-4": "hsla(216, 76%, 44%, 0.4)",
  "--light-primary-color-5": "hsla(216, 76%, 44%, 0.5)",
  "--light-primary-color-6": "hsla(216, 76%, 44%, 0.6)",
  "--light-primary-color-7": "hsla(216, 76%, 44%, 0.7)",
  "--light-primary-color-8": "hsla(216, 76%, 44%, 0.8)",
  "--light-primary-color-9": "hsla(216, 76%, 44%, 0.9)",
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
  "--text-white": "hsl(226, 14%, 18%)", //下拉背景色值
  "--text-remind": "hsl(0, 0%, 100%)",
  "--text-important": "hsl(214, 15%, 80%)",

  //background-color//
  "--background-primary": "hsl(226, 16%, 16%)", //一级背景色
  "--background-secondary": "hsl(229, 18%, 12%)", //二级背景色
  "--background-final": "hsla(226, 14%, 18%, 1)", //网站背景色
  "--background-minor": "hsla(226, 14%, 24%, 1)",

  //border-color//
  "--border-primary": "hsl(216, 22%, 25%)", //主要分割线

  //projection-color//
  "--shadow-primary": "hsl(0, 0%, 8%)",
  "--shadow-button": "hsla(222, 8%, 24%, 0.29)",
  "--shadow-dropdown": "hsla(220, 100%, 65%, 0.2)",
  "--text-gray": "hsl(217, 19, 67, 1)",
  "--shadow-container": "hsla(216, 76%, 44%, 0.1)",
};

const themifyOptions = {
  palette: {
    product: {
      "--text-hover": product["--primary-color"],
      "--white": "hsl(0, 0%, 100%)",
      "--warning-background": "hsl(49, 100%, 50%)",
      "--warning-background-secondary": product["--rqfactor-product-color"],
      "--warning-color": product["--text-primary"],
      "--succeed-color": "hsla(146, 48%, 49%, 1)",
      "--remove-hover-color": "hsl(0, 82%, 61%)",
      "--remove-active-color": "hsl(0, 59%, 47%)",
      "--dropdown-background": product["--background-white"],
      // "--dropdown-active-background": product["--primary-color-2"],
      "--dropdown-hover-background": product["--primary-color-1"],
      // "--background-view": light["--background-secondary"],
      "--background-white-hover": product["--background-primary"],
      ...product,
      ...light,
    },

    dark: {
      "--white": "hsl(0, 0%, 100%)",
      "--text-hover": dark["--primary-color"],
      "--remove-hover-color": "hsl(0, 82%, 61%)",
      "--remove-active-color": "hsl(0, 59%, 47%)",
      "--succeed-color": "hsla(146, 48%, 49%, 1)",
      "--dropdown-background": dark["--text-white"],
      // "--dropdown-active-background": dark["--primary-color-4"],
      "--dropdown-hover-background": product["--primary-color-2"],
      "--warning-background": product["--primary-color"],
      "--warning-background-secondary": "hsl(222, 60%, 37%)",
      "--warning-color": product["--text-white-8"],

      // "--background-view": dark["--background-secondary"],

      "--background-white-hover": product["--primary-color-2"],
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
