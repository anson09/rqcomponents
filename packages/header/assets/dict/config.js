import { info, contact } from "../../../common/assets/dict/config";

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
            link: "/rqdata",
            icon: "rqdata",
            label: "RQData（金融数据API）",
          },

          {
            link: "/quant",
            icon: "quant",
            label: "Ricequant米筐量化",
            links: [
              { link: "/quant", label: "量化首页" },
              { link: "/quant/rq-alpha-plus", label: "RQAlpha Plus" },
              { link: "/quant/factor", label: "因子研究" },
              { link: "/quant/rq-sdk", label: "RQSDK" },
              { link: "/quant/local", label: "本地部署" },
            ],
          },
          {
            link: "/ams",
            icon: "rqams",
            label: "RQAMS（资产管理系统）",
          },
          {
            link: "/rqoptimizer",
            icon: "rqoptimizer",
            label: "RQOptimizer ( 组合优化器 )",
          },
        ],
        more: true,
        label: "产品",
      },
      {
        link: "/pricing",
        label: "定价",
      },
      {
        more: true,
        label: "支持",
        links: [
          {
            links: [
              {
                link: {
                  href: "/doc/rqdata/python/",
                  outer: true,
                },
                label: "Python API文档",
              },
              {
                link: {
                  href: "/doc/rqdata/http/",
                  outer: true,
                },
                label: "HTTP API文档",
              },
            ],

            label: "RQData使用文档",
          },
          {
            link: "/pricing#rqpro",
            label: "RQPro试用咨询",
          },
          {
            link: {
              href: "/doc/quant/",
              outer: true,
            },
            label: "量化平台使用文档",
          },
          {
            link: {
              href: "/doc/rqsdk/",
              outer: true,
            },
            label: "RQSDK使用文档",
          },
          {
            link: {
              href: "/site/courses",
              outer: true,
            },
            label: "米筐量化学院",
          },
        ],
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
      {
        more: true,
        label: "加入我们",
        links: [
          {
            link: {
              href: "/recruitment/social",
              inner: true,
              newBlock: true,
            },
            label: "社会招聘",
          },
          {
            link: {
              href: "/recruitment/school",
              inner: true,
              newBlock: true,
            },
            label: "校园招聘",
          },
        ],
      },
    ],
  },
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
      links: [
        {
          links: [
            {
              link: {
                href: "/doc/rqdata/python/",
                newBlock: true,
              },
              label: "API帮助文档-Python",
            },
            {
              link: {
                href: "/doc/rqdata/http/",
                newBlock: true,
              },
              label: "Restful文档-HTTP服务",
            },
          ],
          label: "RQData 使用文档",
        },
        {
          link: {
            href: "/doc/quant/",
            newBlock: true,
          },
          label: "量化平台文档",
        },
        {
          link: {
            href: "/doc/rqams/",
            newBlock: true,
          },
          label: "RQAMS使用文档",
        },
        {
          link: {
            href: "/doc/rqsdk/",
            newBlock: true,
          },
          label: "RQSDK使用文档",
        },
      ],
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
      type: "message",
      component: "message",
    },
    {
      type: "theme",
      component: "themeSwitch",
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
