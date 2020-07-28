<template>
  <div class="header-wrapper">
    <p v-if="showWarning" class="header-warning">
      <span class="header-warning-text">
        <slot v-if="$slots.notification" name="notification"></slot>
        <template v-else>
          {{ notification }}
        </template>
      </span>
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
      default:
        "哈哈呈韫椟而藏 罗荣城 ifdsalkfjsa韫椟而藏 中要械 哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏哈哈呈韫椟而藏",
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
          data: { code, fullname, avatar, phone, email, userId, rank },
        } = await getAccount();
        if (code === 0) {
          setStorage("account", {
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
    color: rqthemify(--warning-color);
    background: rqthemify(--warning-background);
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    word-break: break-all;
    z-index: 100;
    overflow-x: auto;
    @media screen and(max-width: 1280px) {
      font-size: 12px;
    }
    &-text {
      display: inline-block;
      width: max-content;
      height: 100%;
    }
  }
}
</style>
