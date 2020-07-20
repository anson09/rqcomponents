import { info, contact } from "../../../common/assets/dict/config";

const docLinks = [
  {
    label: "RQSDK文档",
    border: true,
    links: [
      {
        label: "快速上手",
        link: {
          href: "/doc/rqsdk/",
          newBlock: true,
        },
      },
      {
        label: "RQData-金融数据API",
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
        label: "RQAlpha Plus-回测框架",
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
        label: "RQFactor-因子投研工具",
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
        label: "RQOptimizer-股票组合优化器",
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
            icon: "quant",
            link: "/quant",
            product: "quant",
          },
          {
            label: "米筐量化工具套件",
            icon: "rq-sdk",
            link: "/rq-sdk",
            links: [
              {
                label: "RQAlpha Plus",
                icon: "rqalphaplus",
                link: "/rq-alpha-plus",
                product: "rqalphaplus",
              },
              {
                label: "RQData",
                icon: "rqdata",
                link: "/rqdata",
                product: "rqdata",
              },
              {
                label: "RQFactor",
                icon: "rqfactor",
                link: "/rqfactor",
                product: "rqfactor",
              },
              {
                label: "RQOptimizer",
                icon: "rqoptimizer",
                link: "/rqoptimizer",
                product: "rqoptimizer",
              },
            ],
          },
          {
            label: "RQAMS（资产管理系统）",
            icon: "rqams",
            link: "/ams",
            product: "rqams",
          },
        ],
        more: true,
        label: "产品",
        className: "product",
      },
      {
        link: "/pricing",
        label: "定价",
      },
      {
        more: true,
        label: "支持",
        className: "docs",
        links: docLinks,
      },
      {
        link: "/edu",
        label: "教育专区",
      },
      {
        more: true,
        label: "量化社区",
        links: [
          {
            link: {
              href: "/community",
              outer: true,
              newBlock: true,
            },
            label: "量化社区",
          },
          {
            link: {
              href: "/site/tournaments",
              outer: true,
            },
            label: "量化大赛",
          },
          {
            link: {
              href: "/site/scrafts",
              outer: true,
            },
            label: "策略英雄榜",
          },
        ],
      },
    ],
  },
  secondHeader: [
    {
      name: "rqdata",
      // products 数组是为了后面 ams 会有子产品
      products: [
        {
          icon: "rqdata",
          mainLabel: "RQData",
          secondLabel: "金融数据API",
          path: "/rqdata",
        },
      ],
      trialHref: "/pricing#rqdata",
    },
    {
      name: "rqams",
      products: [
        {
          icon: "rqams",
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
          icon: "rqoptimizer",
          mainLabel: "RQOptimizer",
          secondLabel: "组合优化器",
          path: "/rqoptimizer",
        },
      ],
      trialHref: "/pricing#rqoptimizer",
    },
    {
      name: "quant",
      products: [
        {
          icon: "quant",
          mainLabel: "Ricequant",
          secondLabel: "米筐量化",
          path: "/quant",
        },
      ],
      trialHref: "/trial/rq-quant",
    },
    {
      name: "rq-alpha-plus",
      products: [
        {
          icon: "rqalphaplus",
          mainLabel: "RQAlpha Plus",
          secondLabel: "米筐量化策略引擎",
          path: "/rq-alpha-plus",
        },
      ],
      trialHref: "/trial/rq-sdk",
    },
    {
      name: "rqfactor",
      products: [
        {
          icon: "rqfactor",
          mainLabel: "RQFactor",
          secondLabel: "因子研究",
          path: "/rq-factor",
        },
      ],
      trialHref: "/trial/rq-sdk",
    },
    {
      name: "rqsdk",
      products: [
        {
          icon: "rqsdk",
          mainLabel: "",
          secondLabel: "米筐量化工具套件",
          path: "/rq-sdk",
        },
      ],
      trialHref: "/trial/rq-sdk",
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
      link: {
        href: "/community",
        newBlock: true,
      },
      type: "text",
      label: "社区",
    },

    {
      type: "theme",
      component: "themeSwitch",
    },
    {
      type: "message",
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
  ],
};

export { anka, logged };
