<template>
  <div class="header-wrapper">
    <p v-if="showWarning" class="header-warning">
      <slot v-if="$slots.notification" name="notification"></slot>
      <template v-else>
        {{ notification }}
      </template>
    </p>
    <header>
      <transition name="rq-fade-in-linear">
        <logged-header
          v-if="mode === defaultMode && isLogin"
          :username="username"
          :avatar="avatar"
          :is-vip="isVip"
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
import mixin from "../common/mixin";
import { isProductPath, getStorage, setStorage, removeStorage } from "./util";

export default {
  name: "RqHeader",
  components: {
    LoggedHeader,
    AnkaHeader,
  },
  mixins: [mixin],
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
    const localStorageAcount = getStorage("common_account");
    const {
      isLogin = false,
      avatar = "",
      fullname: username = "",
      rank = 0,
      userId = 0,
    } = localStorageAcount;
    return {
      defaultMode: "default",
      isLogin,
      username,
      avatar,
      rank,
      userId,
    };
  },
  computed: {
    isVip() {
      return !isNaN(this.rank) && this.rank === 5;
    },
    showWarning() {
      return this.$slots.notification || this.notification;
    },
  },
  mounted() {
    this.initAccount();
  },
  methods: {
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
          removeStorage("common_account");
          this.handleLink("/");
        }
      };
      const url = this.getPath();
      if (isProductPath(url)) {
        // 在产品内
        const commonHistory = getStorage("common_user_history");
        commonHistory[this.userId] = url;
        setStorage("common_user_history", commonHistory);
      }
      if (this.beforeLogout) this.beforeLogout(done);
      else done();
    },
    async initAccount() {
      try {
        const {
          data: { code, fullname, avatar, phone, email, userId, rank },
        } = await getAccount();
        if (code === 0) {
          setStorage("common_account", {
            isLogin: true,
            fullname,
            avatar,
            phone,
            email,
            userId,
            rank,
          });
          this.isLogin = true;
          this.avatar = avatar;
          this.username = fullname;
          this.userId = userId;
          this.rank = rank;
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
      this.rank = 0;
      removeStorage("common_account");
    },
  },
};
</script>

<style lang="scss" scoped>
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
    width: 100%;
    margin: 0;
    color: rgb(0, 0, 0);
    background: rgb(253, 208, 0);
    font-size: 16px;
    line-height: 1.5;
    word-break: break-all;
    z-index: 100;
  }
}
</style>
