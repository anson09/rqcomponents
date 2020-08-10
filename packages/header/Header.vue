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
import mixin from "../common/util/mixin";
import { getStorage, setStorage, removeStorage } from "../common/util";

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
    };
  },
  computed: {
    showWarning() {
      return !!this.$slots.notification || !!this.notification;
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
    color: rqthemify(--text-primary);
    background: rqthemify(--warning-color);

    font-size: 16px;
    line-height: 1.5;
    word-break: break-all;
    z-index: 100;
  }
}
</style>
