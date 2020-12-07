<template>
  <div
    v-clickoutside="handleClickOutside"
    :class="[
      'rq-header-ws-container',
      { 'is-dropdown-active': dropdownVisible },
    ]"
  >
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="rq-header-ws-dropdown">
        <div
          v-for="item in workspaces"
          :key="item.id"
          :class="[
            'rq-header-ws-dropdown__item',
            { 'is-active': item.id === curWs.id },
          ]"
          @click="setWorkspace(item)"
        >
          <i
            v-if="item.isQuantEnterprise"
            class="icon-base icon-base-enterprise"
          ></i>
          <span class="rq-header-ws-dropdown__item-label">
            {{ item.name }}</span
          >
          <i
            v-if="item.id === curWs.id"
            class="icon-base icon-base-success"
          ></i>
        </div>
        <div class="rq-header-ws-dropdown__btn-wrapper">
          <button class="rq-header-ws-dropdown__btn" @click="createWorkspace">
            <i class="icon-base icon-base-circle-plus"></i>
            创建新的工作空间
          </button>
        </div>
      </div>
    </transition>
    <div
      :class="['rq-header-ws-btn', { 'is-tooltip-hidden': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <span :class="['icon-set-up-wrapper']">
        <template v-if="settingVisible">
          <i
            class="icon-base icon-base-set-up-fill icon-set-up active-icon"
            @click.stop="handleClick"
          ></i>
          <i
            class="icon-base icon-base-set-up icon-set-up"
            @click.stop="handleClick"
          ></i>
          <Tooltip mode="weak" text="进入该工作空间" />
        </template>
      </span>
      <span
        :class="[
          'rq-header-ws-btn__label-wrapper',
          { 'is-tooltip-hidden': dropdownVisible },
        ]"
      >
        <span ref="curWsLabel" class="rq-header-ws-btn__label">
          {{ curWs.name }}
        </span>
        <Tooltip v-show="tooltipVisible" mode="strong" :text="curWs.name" />
      </span>
      <i class="icon-base icon-base-caret-bottom"> </i>
    </div>
  </div>
</template>
<script>
import { getWorksapces, getWorksapcesProducts } from "../api/index";
import {
  setStorage,
  getStorage,
  getDate,
  handleLink,
} from "../../common/util/index";
import dropdownMixin from "./dropdown-mixin";
import Tooltip from "./Tooltip.vue";

export default {
  name: "WorkspaceSwitch",
  components: { Tooltip },
  mixins: [dropdownMixin],
  data() {
    const localStorageAccount = getStorage("account") || {};
    const storageKey = "workspace";
    const localStorageWorkspaces = getStorage(storageKey) || {};
    return {
      tooltipVisible: false,
      workspaces: [],
      curWs: {},
      account: localStorageAccount,
      storageKey,
      localStorageWorkspaces,
    };
  },

  computed: {
    settingVisible() {
      return this.curWs.admin === this.account.userId;
    },
  },
  watch: {
    curWs() {
      this.$nextTick(() => {
        this.tooltipVisible =
          this.$refs.curWsLabel.scrollWidth > this.$refs.curWsLabel.offsetWidth;
      });
    },
  },

  mounted() {
    this.getWorkspaces();
    const refresh = (e) => e.name === "refresh" && this.getWorkspaces();
    rqevent.on("workspace", refresh);
    this.$once("hook:beforeDestroy", () => rqevent.off(refresh));
  },

  methods: {
    handleClick() {
      if (this.settingVisible) {
        handleLink({
          path: `/dashboard/workspace/${this.curWs.id}`,
          outer: true,
        });
      }
    },

    async getWorkspaces() {
      const [res, wsProRes] = await Promise.all([
        getWorksapces(),
        getWorksapcesProducts(),
      ]);
      if (!res?.data) return;
      const wsProductsDict = wsProRes?.data.reduce(
        (obj, cur) => ({
          ...obj,
          [cur.ws_id]: cur.product,
        }),
        {}
      );
      this.workspaces = res.data.map((item) => ({
        ...item,
        isQuantEnterprise: !!wsProductsDict[item.id].find(
          (pro) =>
            pro.product.name === "QUANT" &&
            pro.product.version === "Enterprise" &&
            getDate(pro.start) < new Date() &&
            getDate(pro.expire) > new Date()
        ),
      }));
      if (!this.workspaces.length) {
        delete this.localStorageWorkspaces[this.account.userId];
        setStorage(this.storageKey, this.localStorageWorkspaces);
        return;
      }
      const localStorageWs = this.localStorageWorkspaces[this.account.userId];
      const ws = this.workspaces.find((item) => item.id === localStorageWs);
      this.setWorkspace(ws || this.workspaces[0]);
    },

    setWorkspace(ws) {
      this.localStorageWorkspaces[this.account.userId] = ws.id;
      this.curWs = ws;
      setStorage(this.storageKey, this.localStorageWorkspaces);
      this.$emit("switch-workspace", ws.id);
      this.dropdownVisible = false;
    },

    createWorkspace() {
      const link = { path: "/dashboard", hash: "#createWs" };

      if (window.location.pathname.startsWith(link.path)) {
        this.$emit("create-workspace");
      } else {
        handleLink({
          path: `${link.path}${link.hash}`,
          outer: true,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./../style/mixins.scss";

@include block(ws) {
  &-container {
    color: var(--text-normal);
    position: relative;
    cursor: pointer;
    height: 100%;
    padding: 6px 0;
    margin-left: 10px;
    .icon-base-caret-bottom {
      font-size: 10px;
    }
    @include block(tooltip) {
      display: none;
    }

    .icon-set-up-wrapper {
      height: 24px;
      position: relative;
      @include icon-container("icon-set-up", 16, 4);
      @include block(tooltip) {
        transform: translate(-50%, 8px);
      }
      &:hover {
        @include block(tooltip) {
          display: block;
        }
      }
    }

    &:hover,
    &:active,
    &.is-dropdown-active {
      .icon-base-caret-bottom {
        color: var(--primary-color);
        transform: rotate(180deg);
      }
      .icon-set-up {
        color: var(--primary-color);
        display: none;
        &.active-icon {
          display: inline-block;
        }
      }
    }
  }
  &-dropdown {
    width: 100%;
    left: 0;
    max-height: 230px;
    overflow-y: auto;
    @include dropdown;

    &__item {
      cursor: pointer;
      font-size: 14px;
      position: relative;
      line-height: 20px;
      padding: 10px 60px 10px 20px;
      @include f-center(flex-start);
      color: var(--text-normal);
      .icon-base-enterprise {
        font-size: 16px;
      }
      &-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8px;
      }
      .icon-base-success {
        color: var(--primary-color-3);
        @include t-center-vertical;
        font-size: 16px;
        right: 12px;
        position: absolute;
      }

      &:hover,
      &:active,
      &:focus {
        background-color: var(--bg-secondary);
        color: var(--primary-color);
      }
    }
    &__btn {
      @include f-center;
      background-color: var(--primary-color-1);
      border: none;
      border-radius: 4px;
      padding: 3px 14px 3px 8px;
      line-height: 20px;
      color: var(--text-normal);
      font-size: 14px;
      cursor: pointer;
      outline: none;
      .icon-base-circle-plus {
        font-size: 16px;
        margin-right: 8px;
      }

      &:hover {
        background-color: var(--primary-color);
        color: var(--white);
      }

      &-wrapper {
        padding: 12px 0 0 4px;
        margin: 10px 12px 12px;
        border-top: 1px solid var(--border-primary);
      }
    }
  }

  &-btn {
    color: inherit;
    @include f-center(space-between);
    height: 100%;
    padding: 0 11px 0 4px;
    width: 214px;
    position: relative;
    z-index: 9;
    background-color: var(--bg-minor);
    border-radius: 4px;
    &__label {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &-wrapper {
        flex: 1;
        margin-left: 4px;
        @include f-center;
        height: 100%;
        font-size: 14px;
        overflow: hidden;
        color: var(--text-normal);
        &:not(.is-tooltip-hidden):hover {
          @include block(tooltip) {
            display: block;
          }
        }
      }
    }
  }
}
</style>
