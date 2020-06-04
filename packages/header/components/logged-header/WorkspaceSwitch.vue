<template>
  <div v-if="workspaces.length" class="workspace-container">
    <transition name="rq-zoom-in-top">
      <div v-show="active" class="workspace-dropdown">
        <div
          v-for="item in workspaces"
          :key="item.id"
          :class="[
            'workspace-dropdown__item',
            { 'is-active': item.id === curWs.id },
          ]"
          @click="setWorkspace(item)"
        >
          {{ item.name }}
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
    <div class="workspace-btn">
      <i v-if="settingVisible" class="el-icon-setting" @click="handleClick"></i>
      <span class="workspace-btn__text">{{ curWs.name }}</span>
      <i class="el-icon-caret-bottom workspace-btn__icon"></i>
    </div>
  </div>
  <div v-else class="create-btn" @click="createWorkspace">{{ label }}</div>
</template>
<script>
import { getWorksapces } from "../../api";
import { setStorage, getStorage } from "../../util";

export default {
  name: "WorkspaceSwitch",
  props: {
    settingHref: { type: String, required: true },
    label: { type: String, required: true },
    creatLink: { type: Object, required: true },
    active: { type: Boolean, default: false },
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
    handleLink(cfg) {
      this.$emit("handleLink", cfg);
    },

    async getWorkspaces() {
      try {
        const res = await getWorksapces();
        if (!res.data) return;
        this.workspaces = res.data;
        if (!this.workspaces.length) {
          delete this.localStorageWorkspaces[this.account.userId];
          setStorage(this.storageKey, this.localStorageWorkspaces);
          return;
        }
        const localStorageWs = this.localStorageWorkspaces[this.account.userId];

        const ws = this.workspaces.filter(
          (item) => item.id === localStorageWs
        )[0];

        if (ws) {
          // 有效ws
          this.curWs = ws;
        } else {
          [this.curWs] = this.workspaces;
          this.setWorkspace(this.curWs);
        }
      } catch (err) {
        this.$message.error(err.message);
      }
    },

    setWorkspace(ws) {
      this.localStorageWorkspaces[this.account.userId] = ws.id;
      this.curWs = ws;
      setStorage(this.storageKey, this.localStorageWorkspaces);
      this.$emit("switchWorkspace", ws.id);
      this.toggleDropdown(false);
    },

    createWorkspace() {
      if (this.$parent.getPath().includes(this.creatLink.href)) {
        this.$emit("createWorkspace");
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
    box-sizing: border-box;
    .el-icon-caret-bottom {
      font-size: 12px;
      transition: all 0.3s;
    }
    &:hover {
      color: rqthemify(--text-hover);
      .el-icon-caret-bottom {
        transform: rotate(180deg);
      }
    }
  }
  &-dropdown {
    display: block;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rqthemify(--text-normal);
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
    padding: 0 20px;
    width: 215px;
    box-sizing: border-box;
    position: relative;
    background: inherit;
    justify-content: space-between;
    z-index: 9;
    &__text {
      width: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .el-icon-setting {
      font-size: 16px;
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
