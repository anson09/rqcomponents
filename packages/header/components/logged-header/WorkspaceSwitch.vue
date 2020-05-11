<template>
  <div
    v-if="workspaces.length"
    class="workspace-container"
    @mouseover="toggleDropdown(true)"
    @mouseleave="toggleDropdown(false)"
  >
    <div class="workspace-btn">
      <i
        v-if="settingVisible"
        class="el-icon-setting workspace-btn__icon"
        @click="handleLink"
      ></i>
      <span class="workspace-btn__text">{{ curWs.name }}</span>
      <i
        v-show="!dropdownShow"
        class="el-icon-arrow-down el-icon--right workspace-btn__icon icon--mini"
      ></i>
      <i
        v-show="dropdownShow"
        class="el-icon-arrow-up el-icon--right workspace-btn__icon icon--mini"
      ></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownShow" class="workspace-dropdown">
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
  </div>
  <div v-else class="create-btn" @click="createWorkspace">{{ label }}</div>
</template>
<script>
import { getWorksapces } from "../../api";

export default {
  name: "WorkspaceSwitch",
  props: {
    settingHref: { type: String, required: true },
    label: { type: String, required: true },
    creatLink: { type: Object, required: true },
  },
  data() {
    const localStorageAccount = this.getStorageItem("common_account");
    const storageKey = "common_workspace";
    const localStorageWorkspaces = this.getStorageItem(storageKey);
    return {
      dropdownShow: false,
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
    handleLink() {
      if (this.settingVisible) {
        window.location.href = `${this.settingHref}/${this.curWs.id}`;
      }
    },
    toggleDropdown(show) {
      this.dropdownShow = show;
    },
    async getWorkspaces() {
      try {
        const res = await getWorksapces();
        if (!res.data) return;
        this.workspaces = res.data;
        if (!this.workspaces.length) {
          delete this.localStorageWorkspaces[this.account.userId];
          this.setStorage();
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
    getStorageItem(name) {
      return JSON.parse(localStorage[name] || "{}");
    },
    setWorkspace(ws) {
      this.localStorageWorkspaces[this.account.userId] = ws.id;
      this.curWs = ws;
      this.setStorage();
      this.$emit("switchWorkspace", ws.id);
      this.toggleDropdown(false);
    },

    setStorage() {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.localStorageWorkspaces)
      );
    },
    createWorkspace() {
      if (window.location.href.includes(this.creatLink.href)) {
        this.$emit("createWorkspace");
      } else {
        window.location.href = `${this.creatLink.href}${this.creatLink.hash}`;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.workspace {
  &-container {
    position: relative;
    cursor: pointer;
    height: 100%;
    padding-top: 4px;
    box-sizing: border-box;

    &:hover {
      color: rqthemify(highlight);
    }
  }
  &-dropdown {
    display: block;
    position: absolute;
    width: 100%;
    background: rqthemify(active-background-color);
    left: 0;
    box-shadow: 0px 8px 12px 0px rgba(152, 165, 185, 0.2);
    box-sizing: border-box;
    bottom: 0;
    transform: translateY(100%);
    max-height: 230px;
    overflow-y: auto;
    border-radius: 0 0 8px 8px;

    &__item {
      cursor: pointer;
      font-size: 14px;
      position: relative;
      line-height: 20px;
      padding: 10px 60px 10px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rqthemify(text);
      .el-icon-success {
        color: rqthemify(icon-gray-lighter);
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        right: 12px;
        position: absolute;
      }

      &:hover,
      &:active,
      &:focus {
        background-color: rqthemify(hover-background-color);
        color: rqthemify(highlight);
        font-weight: 600;
      }
    }
    &__btn {
      display: flex;
      align-items: center;
      background-color: rqthemify(bg-gray-dark);
      border: none;
      border-radius: 4px;
      padding: 3px 14px 3px 8px;
      line-height: 20px;
      color: rqthemify(text-gray);
      font-size: 14px;
      cursor: pointer;
      outline: none;
      .el-icon-circle-plus {
        font-size: 16px;
        margin-right: 8px;
      }

      &:hover {
        background-color: rqthemify(bg-gray-dark-hover);
        color: rqthemify(text-white);
        .el-icon-circle-plus {
          color: rqthemify(text-white);
        }
      }
      &:focus,
      &:active {
        transform: scale(1.1);
        transform-origin: left center;
      }

      &-wrapper {
        padding: 12px 0 0 4px;
        margin: 10px 12px 12px;
        border-top: 1px solid rqthemify(border-gray);
      }
    }
  }
  &-btn {
    color: rqthemify(text);
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    width: 215px;
    box-sizing: border-box;
    position: relative;
    background: inherit;
    z-index: 9;
    &__text {
      width: 135px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
      font-size: 14px;
    }
    &__icon {
      margin: 0;
      font-size: 16px;
      margin-right: 8px;
    }
    .icon--mini {
      font-size: 8px;
    }
  }
}
.create-btn {
  color: rqthemify(text);
  font-size: 14px;
  padding: 4px 16px 0;
  &:hover {
    font-weight: 600;
    color: rqthemify(highlight);
  }
}
</style>
