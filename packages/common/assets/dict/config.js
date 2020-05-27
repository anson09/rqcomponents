const contact = [
  {
    qrcode: "qrcode",
    icon: "wechat",
  },
  {
    link: {
      href: "https://zhuanlan.zhihu.com/ricequant",
      newBlock: true,
    },
    icon: "zhihu",
  },
  {
    link: {
      href: "https://xueqiu.com/u/ricequant",
      newBlock: true,
    },
    icon: "xueqiu",
  },
  {
    link: {
      href: "https://weibo.com/ricequant",
      newBlock: true,
    },
    icon: "weibo",
  },
  {
    link: {
      href: "https://github.com/ricequant",
      newBlock: true,
    },
    icon: "github",
  },
];

const info = [
  {
    value: "public@ricequant.com",
    label: "联系邮箱",
  },
  {
    value: "0755-22676337",
    label: "客服电话",
  },
  {
    value: "3010840691",
    label: "QQ",
  },
  {
    value: "9:00 - 18:00",
    label: "周一至周五",
    disabled: true,
  },
];

const storageKeys = {
  account: "common_account",
  userHistory: "common_user_history",
  theme: "theme",
  workspace: "common_workspace",
};

export { info, contact, storageKeys };
