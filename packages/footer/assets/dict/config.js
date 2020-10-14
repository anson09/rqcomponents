import { info, contact } from "../../../common/assets/dict/config";

const links = [
  [
    { title: "产品" },
    {
      label: "量化协作平台",
      link: "/quant",
    },
    {
      label: "RQSDK",
      link: "/rq-sdk",
    },
    {
      label: "RQData",
      link: "/rqdata",
    },
    {
      label: "RQAlpha Plus",
      link: "/rq-alpha-plus",
    },
    {
      label: "RQFactor",
      link: "/rq-factor",
    },
    {
      label: "RQOptimizer",
      link: "/rqoptimizer",
    },
    {
      label: "RQAMS",
      link: "/ams",
    },
  ],
  [
    { title: "公司" },
    {
      label: "关于我们",
      link: "/about",
    },
    {
      label: "知乎专栏",
      link: {
        href: "https://zhuanlan.zhihu.com/ricequant",
        outer: true,
      },
    },
    {
      label: "加入我们",
      link: "/recruitment/social",
    },
  ],
  [
    { title: "支持" },
    // {
    //   label: "帮助中心",
    //   link: "/",
    // },

    {
      label: "RQSDK文档",
      link: {
        href: "/doc/rqsdk/",
        outer: true,
      },
    },
    {
      label: "量化平台文档",
      link: {
        href: "/doc/quant/",
        outer: true,
      },
    },
    {
      label: "RQAMS文档",
      link: {
        href: "/doc/rqams",
        outer: true,
      },
    },
    {
      label: "米筐量化学院",
      link: {
        href: "/site/courses",
        outer: true,
      },
    },
  ],
  [
    { title: "账号中心" },
    {
      label: "管理个人信息",
      link: { href: "/dashboard/account#info", outer: true },
    },
    {
      label: "安全中心",
      link: { href: "/dashboard/account#setting", outer: true },
    },
  ],
  info.map((item) => `${item.label}：${item.value}`),
];

const copyRight = [
  "版权所有©深圳米筐科技有限公司",
  {
    label: "( 粤ICP备15023309号-1 )",
    link: {
      href:
        "https://v.yunaq.com/certificate?domain=www.ricequant.com&code=90020",
      outer: true,
    },
  },
];

export default { info, contact, links, copyRight };
