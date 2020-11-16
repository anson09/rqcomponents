<template>
  <div class="rq-header-wrapper">
    <Notification :text="notification">
      <template v-if="$slots.notification">
        <slot name="notification" />
      </template>
    </Notification>
    <header class="rq-header">
      <!-- 产品菜单 -->
      <ProductMenu :config="products" />
      <!-- 首页 icon -->
      <div
        class="rq-header-home tooltip-wrapper"
        @click="handleLink(home.link)"
      >
        <i class="icon-base icon-home icon-base-ricequant"></i>
        <i class="icon-base icon-home icon-base-back-website active-icon"></i>
        <Tooltip :text="home.tooltipText" />
      </div>
      <!-- 当前产品 -->
      <span v-if="activeProduct.name" class="rq-header-name">{{
        activeProduct.name
      }}</span>
      <!-- 工作空间 -->
      <WorkspaceSwitch
        @switch-workspace="handleEvent('switch-workspace', $event)"
        @create-workspace="handleEvent('create-workspace')"
      />
      <!-- 当前产品导航 -->
      <ProductNav v-show="activeProduct" :config="activeProduct" />
      <!-- 路演 -->
      <button class="rq-header-road-show" @click="handleLink(roadShow.link)">
        {{ roadShow.label }}
      </button>
      <!-- 文档 -->
      <Document />
      <!-- 主题 -->
      <ThemeSwitch />
      <!-- 消息 -->
      <Message />
      <!-- 头像 -->
      <Account
        :avatar="account.avatar"
        :username="account.fullname"
        @logout="handleLogout"
      />
    </header>
  </div>
</template>
<script>
import { getAccount } from "../common/util/account";
import { rootMixin } from "../common/util/mixin";
import Tooltip from "./components/Tooltip.vue";
import ProductMenu from "./components/ProductMenu.vue";
import WorkspaceSwitch from "./components/WorkspaceSwitch.vue";
import ProductNav from "./components/ProductNav.vue";
import Document from "./components/Document.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import Message from "./components/Message.vue";
import Account from "./components/Account.vue";
import { logout } from "./api/index";
import { removeStorage } from "../common/util";
import Notification from "../common/components/Notification.vue";

export default {
  name: "RqLoggedHeader",
  components: {
    Tooltip,
    ProductMenu,
    WorkspaceSwitch,
    ProductNav,
    Document,
    ThemeSwitch,
    Message,
    Account,
    Notification,
  },
  mixins: [rootMixin],
  props: {
    notification: {
      default: "",
      type: String,
    },
    beforeLogout: {
      default: null,
      type: Function,
    },
  },
  data() {
    return {
      products: [],
      account: {},
      roadShow: {
        label: "预约路演",
        link: {
          href: "/trial/road-show",
          event: "roadShow",
        },
      },
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
  async mounted() {
    this.account = await getAccount();
    this.initProducts();
  },
  methods: {
    initProducts() {
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
        isActive: this.getPath().startsWith(item.link.href),
      }));
    },
    handleEvent(name, data) {
      this.$emit(name, data);
    },
    handleLogout() {
      const done = async () => {
        const { code } = await logout();
        if (code === 0) {
          removeStorage("account");
          this.handleLink("/");
        }
      };
      if (this.beforeLogout) this.beforeLogout(done);
      else done();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style/mixins.scss";
@include reset;
@include block(null) {
  position: relative;
  @include f-center;
  width: 100%;
  min-width: $medium-vw;
  height: 41px;
  border-bottom: 1px solid rqthemify(--border-primary);
  padding-left: 24px;
  padding-right: 10px;
  background: rqthemify(--background-final);
  z-index: 1;
  color: rqthemify(--shadow-primary);
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rqthemify(--border-primary);
    border-radius: 3px;
  }
  &-wrapper {
    position: relative;
    z-index: 1000;
    width: 100%;
  }
}

@include block(home) {
  margin: 0 4px 0 13px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 4px;
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

  #{$namespace}-tooltip {
    top: 110%;
  }
}

@include block(name) {
  color: rqthemify(--text-remind);
  font-size: 16px;
  width: 60px;
  font-weight: 500;
  margin: 0 10px 0 4px;
}
@include block(road-show) {
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
</style>
