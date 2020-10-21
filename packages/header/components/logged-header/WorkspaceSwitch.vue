<template>
  <div
    v-if="workspaces.length"
    v-clickoutside="handleClickOutside"
    class="workspace-container"
  >
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="workspace-dropdown">
        <div
          v-for="item in workspaces"
          :key="item.id"
          :class="[
            'workspace-dropdown__item',
            { 'is-active': item.id === curWs.id },
          ]"
          @click="setWorkspace(item)"
        >
          <i
            v-if="item.isQuantEnterprise"
            class="icon-base icon-base-enterprise"
          ></i>
          <span class="workspace-dropdown__item-label"> {{ item.name }}</span>
          <i v-if="item.id === curWs.id" class="el-icon-success"></i>
        </div>
        <div class="workspace-dropdown__btn-wrapper">
          <button class="workspace-dropdown__btn" @click="createWorkspace">
            <i class="el-icon-circle-plus"></i>
            {{ label }}
          </button>
        </div>
      </div>
    </transition>
    <div class="workspace-btn" @click="toggleDropdownVisible">
      <span class="el-icon-s-tools-wrapper">
        <i
          v-if="settingVisible"
          class="el-icon-s-tools"
          @click.stop="handleClick"
        ></i>
      </span>
      <span class="workspace-btn__text">{{ curWs.name }}</span>
      <i
        :class="[
          dropdownVisible ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
          'workspace-btn__icon',
        ]"
      ></i>
    </div>
  </div>
  <div v-else class="create-btn" @click="createWorkspace">{{ label }}</div>
</template>
<script>
import { getWorksapces, getWorksapcesProducts } from "../../api";
import { setStorage, getStorage, getDate } from "../../../common/util";
import mixin from "../../../common/util/mixin";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "WorkspaceSwitch",
  mixins: [mixin, dropdownMixin],
  props: {
    settingHref: { type: String, required: true },
    label: { type: String, required: true },
    creatLink: { type: Object, required: true },
  },
  data() {
    const localStorageAccount = getStorage("account");
    const storageKey = "workspace";
    const localStorageWorkspaces = getStorage(storageKey);
    return {
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

  mounted() {
    this.getWorkspaces();
    try {
      const refresh = (e) => e.name === "refresh" && this.getWorkspaces();
      rqevent.on("workspace", refresh);
      this.$once("hook:beforeDestroy", () => rqevent.off(refresh));
    } catch (e) {
      // throw { message: "rqevent is not supported currently" };
    }
  },

  methods: {
    handleClick() {
      if (this.settingVisible) {
        this.handleLink({
          href: `${this.settingHref}/${this.curWs.id}`,
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
        isQuantEnterprise: !!wsProductsDict[item.id].find((pro) => {
          return (
            pro.product.name === "QUANT" &&
            pro.product.version === "Enterprise" &&
            getDate(pro.start) < new Date() &&
            getDate(pro.expire) > new Date()
          );
        }),
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
      this.toggleDropdownVisible(false);
    },

    createWorkspace() {
      if (this.getPath().includes(this.creatLink.href)) {
        this.$emit("create-workspace");
      } else {
        this.handleLink({
          href: `${this.creatLink.href}${this.creatLink.hash}`,
          outer: true,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.workspace {
  &-container {
    position: relative;
    cursor: pointer;
    height: 100%;
    padding: 6px 0;
    box-sizing: border-box;
    .el-icon-caret-bottom {
      font-size: 12px;
      transition: all 0.3s;
    }
    .el-icon-s-tools-wrapper {
      @include logged-icon-container("el-icon-s-tools");
    }
    &:hover,
    &:active {
      .el-icon-s-tools {
        color: rqthemify(--text-hover);
      }
      .el-icon-caret-bottom {
        color: rqthemify(--text-hover);
      }
    }
  }
  &-dropdown {
    position: absolute;
    width: 100%;
    background: rqthemify(--dropdown-background);
    left: 0;
    box-shadow: 0px 8px 12px 0px rqthemify(--shadow-primary);
    box-sizing: border-box;
    top: 100%;
    max-height: 230px;
    overflow-y: auto;

    &__item {
      cursor: pointer;
      font-size: 14px;
      position: relative;
      line-height: 20px;
      padding: 10px 60px 10px 20px;

      display: flex;
      align-items: center;
      color: rqthemify(--text-normal);
      .icon-base-enterprise {
        font-size: 16px;
      }
      &-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8px;
      }
      .el-icon-success {
        color: rqthemify(--primary-color-3);
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        right: 12px;
        position: absolute;
      }

      &:hover,
      &:active,
      &:focus {
        background-color: rqthemify(--background-white-hover);
        color: rqthemify(--text-hover);
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      background-color: rqthemify(--background-secondary);
      border: none;
      border-radius: 4px;
      padding: 3px 14px 3px 8px;
      line-height: 20px;
      color: rqthemify(--text-normal);
      font-size: 14px;
      cursor: pointer;
      outline: none;
      @include click-scale();

      .el-icon-circle-plus {
        font-size: 16px;
        margin-right: 8px;
      }

      &:hover {
        background-color: rqthemify(--primary-color);
        color: rqthemify(--white);
      }

      &-wrapper {
        padding: 12px 0 0 4px;
        margin: 10px 12px 12px;
        border-top: 1px solid rqthemify(--border-primary);
      }
    }
  }

  &-btn {
    color: inherit;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px 0 4px;
    width: 210px;
    box-sizing: border-box;
    position: relative;
    justify-content: space-between;
    z-index: 9;
    background: rqthemify(--background-minor);
    border-radius: 4px;
    &__text {
      width: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }
  &-dropdown:hover ~ &-btn {
    box-shadow: 0px 0px 20px rqthemify(--shadow-primary);
  }
}
.create-btn {
  color: rqthemify(--text-normal);
  font-size: 14px;
  padding: 0 20px;
  &:hover {
    color: rqthemify(--text-hover);
  }
}
</style>
