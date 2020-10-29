<template>
  <div class="logged-header">
    <!-- 产品菜单 -->
    <ProductMenu :config="products" />
    <!-- 首页 icon -->
    <div class="home tooltip-wrapper" @click="handleLink(home.link)">
      <i class="icon-base icon-home icon-base-ricequant"></i>
      <i class="icon-base icon-home icon-base-back-website active-icon"></i>
      <Tooltip :text="home.tooltipText" />
    </div>
    <!-- 当前产品 -->
    <span v-if="activeProduct.name" class="active-product-name">{{
      activeProduct.name
    }}</span>
    <!-- 工作空间 -->
    <WorkspaceSwitch @switch-workspace="$emit('switch-workspace', $event)" />
    <!-- 当前产品导航 -->
    <ProductNav v-show="activeProduct" :config="activeProduct" />
    <!-- 路演 -->
    <button class="roadshow" @click="handleLink(roadShow.link)">
      {{ roadShow.label }}
    </button>
    <!-- 文档 -->
    <Document />
    <!-- 主题 -->
    <ThemeSwitch />
    <!-- 消息 -->
    <Message />
    <!-- 头像 -->
    <Account v-bind="$attrs" />
  </div>
</template>

<script>
import ThemeSwitch from "./logged-header/ThemeSwitch.vue";
import Message from "./logged-header/Message.vue";
import WorkspaceSwitch from "./logged-header/WorkspaceSwitch.vue";
import Document from "./logged-header/Document.vue";
import Account from "./logged-header/Account.vue";
import mixin from "../../common/util/mixin";
import Tooltip from "./logged-header/Tooltip.vue";
import clickoutside from "../../common/util/clickoutside";
import ProductMenu from "./logged-header/ProductMenu.vue";
import ProductNav from "./logged-header/ProductNav.vue";

export default {
  name: "LoggedHeader",
  components: {
    ThemeSwitch,
    Message,
    Document,
    Account,
    WorkspaceSwitch,
    Tooltip,
    ProductMenu,
    ProductNav,
  },
  directives: { clickoutside },
  mixins: [mixin],

  data() {
    return {
      roadShow: {
        label: "预约路演",
        link: {
          href: "/trial/road-show",
          event: "roadShow",
        },
      },
      products: [],
      home: {
        tooltipText: "回到米筐官网首页",
        link: "/",
      },
    };
  },
  computed: {
    activeProduct() {
      return this.products.find((item) => item.isActive) || {};
    },
  },
  mounted() {
    const path = this.getPath();
    this.products = [
      {
        link: {
          href: "/quant",
          outer: true,
        },

        label: "Quant 量化协作平台",
        name: "Quant",
      },

      {
        link: {
          href: "/ams",
          outer: true,
        },
        label: "RQAMS 资管平台",
        name: "RQAMS",
        links: [
          {
            label: "投后分析",
            icon: "performance-analysis",
            link: "/post-investment-analysis",
          },
          {
            label: "风险管理",
            icon: "risk-management",
            link: "/risk-management",
          },
          {
            label: "投资驾驶舱",
            icon: "investment-cockpit",
            link: "/investment-cockpit",
          },
          {
            label: "组合管理",
            icon: "portfolio-management",
            link: "/portfolio-management",
          },
          {
            label: "分享给我",
            icon: "share-me",
            link: "/sharing-management",
          },
        ],
      },
      {
        link: {
          href: "/fof",
          outer: true,
        },
        label: "RQFund 基金投研",
        name: "RQFund",
      },
      {
        link: {
          href: "/bond",
          outer: true,
        },
        label: "RQBond 债券投研",
        name: "RQBond",
      },
    ].map((item) => ({
      ...item,
      isActive: path.startsWith(item.link.href),
    }));
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixins";

.logged-header {
  position: relative;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 41px;
  border-bottom: 1px solid rqthemify(--border-primary);
  padding-left: 24px;
  padding-right: 10px;
  background: rqthemify(--background-final);
  z-index: 1;
  color: rqthemify(--shadow-primary);

  .home {
    margin: 0 4px 0 13px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    color: rqthemify(--primary-color);
    line-height: 30px;
    background-color: rqthemify(--background-minor);
    @include tooltip-wrapper;
    .icon-home {
      font-size: 20px;
    }
    .icon-base-back-website {
      display: none;
    }
    &:hover {
      .icon-base-back-website {
        display: inline-block;
      }
      .icon-base-ricequant {
        display: none;
      }
    }

    .tooltip {
      top: 110%;
    }
  }
  .active-product-name {
    color: rqthemify(--text-remind);
    font-size: 16px;
    width: 60px;
    font-weight: 500;
    margin: 0 10px 0 4px;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rqthemify(--border-primary);
    border-radius: 3px;
  }

  .roadshow {
    background-color: rqthemify(--background-gray);
    border-radius: 16px;
    color: rqthemify(--text-button);
    font-weight: 600;
    font-size: 14px;
    line-height: 1;
    padding: 6px 20px;
    margin: 0 13px;
    box-shadow: 0px 4px 4px rqthemify(--shadow-button);
    &:hover,
    &:active {
      color: rqthemify(--white);
      background-color: rqthemify(--primary-color);
      box-shadow: 0px 4px 4px rqthemify(--shadow-dropdown);
    }
    &:active {
      background-color: rqthemify(--background-active);
    }
  }
}
</style>
