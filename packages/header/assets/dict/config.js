import { info, contact } from "../../../common/assets/dict/config";

const docLinks = [
  {
    label: "RQSDK使用文档",
    links: [
      {
        label: "Ricequant SDK快速上手",
        link: {
          href: "/doc/rqsdk/",
          newBlock: true,
        },
      },
      {
        label: "RQData - 金融数据 API",
        links: [
          {
            label: "Python API文档",
            link: {
              href: "/doc/rqdata/python/",
              newBlock: true,
            },
          },
          {
            label: "Http API文档",
            link: {
              href: "/doc/rqdata/http/",
              newBlock: true,
            },
          },
        ],
      },
      {
        label: "RQAlpha Plus - 回测框架",
        links: [
          {
            label: "使用教程",
            link: {
              href: "/doc/rqalpha-plus/tutorial.html",
              newBlock: true,
            },
          },
          {
            label: "API使用手册",
            link: {
              href: "/doc/rqalpha-plus/api/",
              newBlock: true,
            },
          },
        ],
      },
      {
        label: "RQFactor - 因子投研工具",
        links: [
          {
            label: "使用教程",
            link: {
              href: "/doc/rqfactor/manual.html",
              newBlock: true,
            },
          },
          {
            label: "API使用手册",
            link: {
              href: "/doc/rqfactor/api.html",
              newBlock: true,
            },
          },
        ],
      },
      {
        label: "RQOptimizer - 股票组合优化器",
        links: [
          {
            label: "使用教程",
            link: {
              href: "/doc/rqoptimize/manual.html",
              newBlock: true,
            },
          },
          {
            label: "API使用手册",
            link: {
              href: "/doc/rqoptimizer/api/",
              newBlock: true,
            },
          },
        ],
      },
    ],
  },
  {
    label: "RQAMS文档",
    link: {
      href: "/doc/rqams/",
      newBlock: true,
    },
  },
  {
    label: "量化平台文档",
    link: { href: "/doc/quant/", newBlock: true },
  },
  {
    label: "RQFUND米筐公募基金文档",
    // TODO
    link: { href: "/doc/quant/", newBlock: true },
  },
  {
    label: "RQBOND米筐债券文档",
    // TODO
    link: { href: "/doc/quant/", newBlock: true },
  },
];

const anka = {
  support: {
    contact,
    info,
    label: "支持",
  },
  header: {
    others: [
      {
        link: "/recruitment/social",
        label: "社会招聘",
      },
      {
        link: "/recruitment/school",
        label: "校园招聘",
      },
      {
        link: "/about",
        label: "关于我们",
      },
    ],
    default: [
      {
        links: [
          {
            label: "米筐量化协作平台",
            iconColorful: "logo-ricequant",
            link: "/quant",
            product: "quant",
            border: true,
          },
          {
            label: "RQSDK米筐量化工具套件",
            iconColorful: "logo-sdk",
            link: "/rq-sdk",
            product: "rqsdk",
            links: [
              {
                label: "RQData 金融数据API",
                link: "/rqdata",
                product: "rqdata",
              },
              {
                label: "RQAlpha Plus 回测框架",
                link: "/rq-alpha-plus",
                product: "rqalphaplus",
              },

              {
                label: "RQFactor 因子投研工具",
                link: "/rq-factor",
                product: "rqfactor",
              },
              {
                label: "RQOptimizer 股票组合优化器",
                link: "/rqoptimizer",
                product: "rqoptimizer",
              },
            ],
          },
          {
            label: "RQAMS（资产管理系统）",
            icon: "logo-ams",
            link: "/ams",
            product: "rqams",
          },
        ],
        label: "产品",
        className: "product",
        component: "productDropdownMenu",
      },
      {
        link: "/pricing",
        label: "定价",
      },
      {
        label: "支持",
        className: "docs",
        links: docLinks,
        component: "docDropdownMenu",
      },
      {
        link: "/edu",
        label: "教育专区",
      },
    ],
  },
  secondHeader: [
    {
      name: "rqdata",
      // products 数组是为了后面 ams 会有子产品
      products: [
        {
          icon: "logo-rqdata-round",
          mainLabel: "RQData",
          secondLabel: "金融数据API",
          path: "/rqdata",
        },
      ],
      trialHref: "/trial/rqsdk-cloud",
    },
    {
      name: "rqams",
      products: [
        {
          icon: "logo-ams",
          mainLabel: "RQAMS",
          secondLabel: "米筐资产管理系统",
          path: "/ams",
        },
      ],
      trialHref: "/pricing#rqams",
    },
    {
      name: "rqoptimizer",
      products: [
        {
          icon: "logo-rqoptimizer-round",
          mainLabel: "RQOptimizer",
          secondLabel: "米筐股票优化器",
          path: "/rqoptimizer",
        },
      ],
      trialHref: "/trial/rqsdk-cloud",
    },
    {
      name: "quant",
      products: [
        {
          iconColorful: "logo-ricequant",
          mainLabel: "Ricequant",
          secondLabel: "米筐量化协作平台",
          path: "/quant",
        },
      ],
      trialHref: "/trial/rq-quant",
    },
    {
      name: "rqalphaplus",
      products: [
        {
          icon: "logo-rqalphaplus-round",

          mainLabel: "RQAlpha Plus",
          secondLabel: "米筐量化策略引擎",
          path: "/rq-alpha-plus",
        },
      ],
      trialHref: "/trial/rqsdk-cloud",
    },
    {
      name: "rqfactor",
      products: [
        {
          icon: "logo-rqfactor-round",
          mainLabel: "RQFactor",
          secondLabel: "因子研究",
          path: "/rq-factor",
        },
      ],
      trialHref: "/trial/rqsdk-cloud",
    },
    {
      name: "rqsdk",
      products: [
        {
          iconColorful: "logo-sdk",
          mainLabel: "RQSDK",
          secondLabel: "米筐量化工具套件",
          path: "/rq-sdk",
        },
      ],
      trialHref: "/trial/rqsdk-cloud",
    },
  ],
};
const logged = {
  right: [
    {
      link: {
        href: "/trial/road-show",
        event: "roadShow",
      },
      type: "button",
      label: "预约路演",
    },
    {
      component: "workspaceSwitch",

      creatLink: {
        href: "/dashboard",
        hash: "#createWs",
      },
      settingHref: "/dashboard/workspace",
      label: "创建新的工作空间",
    },

    {
      links: docLinks,

      type: "dropdown",
      label: "帮助文档",
    },

    {
      component: "themeSwitch",
    },
    {
      component: "message",
    },

    {
      links: [
        {
          link: {
            href: "/dashboard",
            outer: true,
          },
          label: "个人主页",
        },
        {
          link: {
            href: "/dashboard/account#setting",
            outer: true,
          },
          label: "账号中心",
        },
        {
          link: "/",
          label: "回到首页",
        },
        {
          event: "logout",
          label: "登出账号",
        },
      ],
      component: "account",
    },
  ],
  left: [
    {
      link: {
        href: "/quant/",
        outer: true,
      },

      label: "量化",
    },
    {
      link: {
        href: "/ams/",
        outer: true,
      },
      label: "AMS",
    },
    {
      link: {
        href: "/fof/",
        outer: true,
      },
      label: "基金投研",
    },
    {
      link: {
        href: "/bond/",
        outer: true,
      },
      label: "债券投研",
    },
  ],
};

export { anka, logged };
