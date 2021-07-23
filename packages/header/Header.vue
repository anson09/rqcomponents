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
        :user-id="account.userId"
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
      <Message v-if="hasMessage" />
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
import Tooltip from "./components/Tooltip.vue";
import ProductMenu from "./components/ProductMenu.vue";
import WorkspaceSwitch from "./components/WorkspaceSwitch.vue";
import ProductNav from "./components/ProductNav.vue";
import Document from "./components/Document.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import Message from "./components/Message.vue";
import Account from "./components/Account.vue";
import { logout, getAccount } from "./api/index";
import {
  removeStorage,
  setStorage,
  handleLink,
  globalGuard,
} from "../common/util/index";
import Notification from "./components/Notification.vue";

export default {
  name: "RqHeader",
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
  props: {
    notification: {
      default: "",
      type: String,
    },
    beforeLogout: {
      default: null,
      type: Function,
    },
    home: {
      type: Object,
      default() {
        return {
          tooltipText: "回到米筐官网首页",
          link: { path: "/", outer: true },
        };
      },
    },
    hasMessage: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      products: [],
      account: {},
      roadShow: {
        label: "预约路演",
        link: { path: "/welcome/trial/road-show", outer: true },
      },
    };
  },
  computed: {
    activeProduct() {
      return this.products.find((item) => item.isActive) || {};
    },
  },
  async mounted() {
    this.getAccount();
    this.initProducts();
  },
  methods: {
    handleLink,
    async getAccount() {
      const { data } = await getAccount();
      if (data.code === 0) {
        setStorage("account", {
          isLogin: true,
          fullname: data.fullname,
          avatar: data.avatar,
          phone: data.phone,
          email: data.email,
          userId: data.userId,
        });
        this.account = data;
        globalGuard("gio", "setUserId", data.userId);
      } else {
        removeStorage("account");
      }
    },
    initProducts() {
      this.products = [
        {
          link: {
            path: "/quant",
            outer: true,
          },

          label: "Quant 量化协作平台",
          name: "Quant",
        },

        {
          link: {
            path: "/ams",
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
              label: "投资驾驶舱",
              icon: "investment-cockpit",
              link: "/investment-cockpit",
            },
            {
              label: "数据管理",
              icon: "portfolio-management",
              link: "/portfolio-management",
            },
          ],
        },
        {
          link: {
            path: "/fof",
            outer: true,
          },
          label: "RQFund 基金投研",
          name: "RQFund",
        },
      ].map((item) => ({
        ...item,
        isActive: window.location.pathname.startsWith(item.link.path),
      }));
    },
    handleEvent(name, data) {
      this.$emit(name, data);
    },
    async handleLogout() {
      if (this.beforeLogout) {
        await this.beforeLogout();
      }
      const { code } = await logout();
      if (code === 0) {
        removeStorage("account");
        this.handleLink({ outer: true, path: "/" });
      }
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

  height: 40px;
  box-shadow: 0px 2px 4px var(--primary-color-1);
  padding-left: 24px;
  padding-right: 10px;
  background: var(--bg-primary);
  z-index: 1;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--border-primary);
    border-radius: 3px;
  }
  &-wrapper {
    position: relative;
    z-index: 1000;
    width: 100%;
    min-width: $medium-vw;
  }
}

@include block(home) {
  margin: 0 4px 0 13px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 4px;
  color: var(--primary-color);
  line-height: 30px;
  background-color: var(--bg-minor);
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

  @include block(tooltip) {
    transform: translate(-50%, 6px);
  }
}

@include block(name) {
  color: var(--text-title);
  font-size: 16px;
  width: 60px;
  font-weight: 500;
  margin: 0 10px 0 4px;
}
@include block(road-show) {
  background-color: var(--text-normal);
  border-radius: 16px;
  color: var(--road-show-text);
  font-weight: 400;
  letter-spacing: 2px;
  font-size: 14px;
  line-height: 1;
  padding: 6px 20px;
  margin: 0 13px;
  box-shadow: var(--bg-shadows);
  &:hover,
  &:active {
    color: var(--white);
    background-color: var(--primary-color);
    box-shadow: 0px 4px 4px var(--primary-color-2);
  }
  &:active {
    background-color: var(--road-show-active-bg);
  }
}
</style>
