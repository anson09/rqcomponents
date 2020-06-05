import { info, contact } from "../../../common/assets/dict/config";

const links = [
  [
    { label: "产品" },
    {
      label: "AMS(组合管理)",
      link: "/ams",
    },
    {
      label: "RQPro(投研交易)",
      link: "/rqpro",
    },
    {
      label: "RQData(金融数据)",
      link: "/rqdata",
    },
  ],
  [
    { label: "资源" },
    {
      label: "帮助中心",
      link: "",
    },
    {
      label: "案例中心",
      link: "",
    },
  ],
  [
    { label: "公司" },
    {
      label: "关于我们",
      link: "/about",
    },
    {
      label: "知乎专栏",
      link: "",
    },
    {
      label: "加入我们",
      link: "/",
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

// const info = information.map((item) => `${item.label}：${item.value}`);

export default { info, contact, links, copyRight };
