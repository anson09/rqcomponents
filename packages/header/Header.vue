<template>
  <div class="header-wrapper">
    <p v-if="showWarning" class="header-warning">
      <slot v-if="$slots.notification" name="notification"></slot>
      <template v-else>
        {{ notification }}
      </template>
      <i class="el-icon-circle-close" @click="handleCloseWarning"></i>
    </p>
    <header>
      <transition name="rq-fade-in-linear">
        <logged-header
          v-if="mode === defaultMode && isLogin"
          :username="username"
          :avatar="avatar"
          @switchWorkspace="switchWorkspace"
          @createWorkspace="createWorkspace"
          @logout="handleLogout"
        ></logged-header>
        <anka-header
          v-else
          :topic="topic"
          :opacity="opacity"
          :is-login="isLogin"
        ></anka-header>
      </transition>
    </header>
  </div>
</template>

<script>
import LoggedHeader from "./components/LoggedHeader.vue";
import AnkaHeader from "./components/AnkaHeader.vue";
import { getAccount, logout } from "./api";
import { rootMixin } from "../common/util/mixin";
import { getStorage, setStorage, removeStorage } from "../common/util";

export default {
  name: "RqHeader",
  components: {
    LoggedHeader,
    AnkaHeader,
  },
  mixins: [rootMixin],

  props: {
    notification: {
      default: "",
      type: String,
    },
    mode: {
      default: "default",
      type: String,
    },
    opacity: {
      default: false,
      type: Boolean,
    },
    topic: {
      default: "",
      type: String,
    },
    beforeLogout: {
      default: null,
      type: Function,
    },
  },
  data() {
    const localStorageAcount = getStorage("account");
    const {
      isLogin = false,
      avatar = "",
      fullname: username = "",
      userId = 0,
    } = localStorageAcount;
    return {
      defaultMode: "default",
      isLogin,
      username,
      avatar,
      userId,
      isWarngingHidden: false,
    };
  },
  computed: {
    showWarning() {
      return (
        !this.isWarngingHidden &&
        (!!this.$slots.notification || !!this.notification)
      );
    },
  },

  mounted() {
    this.initAccount();
  },
  methods: {
    handleCloseWarning() {
      this.isWarngingHidden = true;
    },
    switchWorkspace(val) {
      this.$emit("switchWorkspace", val);
    },
    createWorkspace() {
      this.$emit("createWorkspace");
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
    async initAccount() {
      try {
        const {
          data: { code, fullname, avatar, phone, email, userId },
        } = await getAccount();
        if (code === 0) {
          setStorage("account", {
            isLogin: true,
            fullname,
            avatar,
            phone,
            email,
            userId,
          });
          this.isLogin = true;
          this.avatar = avatar;
          this.username = fullname;
          this.userId = userId;
        } else {
          this.reset();
        }
      } catch {
        this.reset();
      }
    },
    reset() {
      this.isLogin = false;
      this.avatar = "";
      this.username = "";
      removeStorage("account");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/style/mixins.scss";
::v-deep {
  button {
    cursor: pointer;
    outline: none;
    background: transparent;
    border: none;
    color: inherit;
    @include click-scale();
  }
}
.header {
  header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
  }
  &-wrapper {
    position: relative;
    width: 100%;
  }
  &-warning {
    position: relative;
    box-sizing: border-box;
    padding-right: 24px;
    color: rqthemify(--warning-color);
    background: rqthemify(--warning-background);
    font-size: 16px;
    line-height: 24px;
    ::-webkit-scrollbar {
      height: 4px;
    }

    @media screen and(max-width: 1280px) {
      font-size: 12px;
    }
    display: flex;
    .el-icon-circle-close {
      cursor: pointer;
      padding: 4px;
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      height: 100%;
      top: 0;
      box-sizing: border-box;
      background: rqthemify(--warning-background-secondary);
    }
  }
}
</style>
