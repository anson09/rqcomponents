<template>
  <div
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
      <span class="workspace-btn__text">{{ curWs.name }} </span>
      <i
        v-show="!dropdownShow"
        class="el-icon-arrow-down  el-icon--right workspace-btn__icon icon--mini"
      ></i>
      <i
        v-show="dropdownShow"
        class="el-icon-arrow-up  el-icon--right workspace-btn__icon icon--mini"
      ></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownShow" class="workspace-dropdown">
        <div
          v-for="item in workspaces"
          :key="item.id"
          :class="[
            'workspace-dropdown__item',
            { 'is-active': item.id === curWs.id }
          ]"
          @click="setWorkspace(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getWorksapces } from "../../../api";

export default {
  name: "WorkspaceSwitch",
  data() {
    const localStorageAccount = this.getStorageItem("common_account");
    return {
      dropdownShow: false,
      workspaces: [],
      curWs: {},
      account: localStorageAccount,
      storageKey: "common_workspace"
    };
  },

  computed: {
    settingVisible() {
      return this.curWs.admin === this.account.userId;
    }
  },

  mounted() {
    this.getWorkspaces();
  },
  methods: {
    handleLink() {
      if (this.settingVisible) {
        window.location.href = `/dashboard/workspace/${this.curWs.id}`;
      }
    },
    toggleDropdown(show) {
      this.dropdownShow = show;
    },
    async getWorkspaces() {
      try {
        ({ data: this.workspaces } = await getWorksapces());

        const localStorageWorkspace = this.getStorageItem(this.storageKey)[
          this.account.userId
        ];

        const ws = this.workspaces.filter(
          item => item.id === localStorageWorkspace
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
      const localStorageWorkspaces = this.getStorageItem(this.storageKey);
      this.curWs = ws;
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          ...localStorageWorkspaces,
          [this.account.userId]: ws.id
        })
      );
      this.$emit("switchWorkspace", ws.id);
      this.toggleDropdown(false);
    }
  }
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
    color: rqthemify(text);
    &:hover {
      color: rqthemify(highlight);
    }
  }
  &-dropdown {
    display: block;
    position: absolute;
    width: 100%;
    background: white;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 8px 0px;
    box-sizing: border-box;
    bottom: 0;
    transform: translateY(100%);

    &__item {
      cursor: pointer;
      font-size: 14px;
      line-height: 20px;
      margin: 10px 0;
      padding: 10px 60px 10px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rqthemify(text);
      &.is-active {
        color: rqthemify(highlight);
      }
      &:hover,
      &:active,
      &:focus {
        background-color: #ecf0f4;
        color: rqthemify(highlight);
        font-weight: 600;
      }
    }
  }
  &-btn {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
    position: relative;
    background: white;
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
</style>
