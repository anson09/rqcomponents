<template>
  <div class="header-wrapper">
    <!-- <Notification
      text="Notification NotificationNotificationNotificationNotificationNotificationNotificationNotification"
    >
      <p>fdalfjdsljflsdjklfdjl</p>
    </Notification> -->
    <header>
      <transition name="rq-fade-in-linear">
        <logged-header
          v-if="mode === defaultMode && isLogin"
          :username="username"
          :avatar="avatar"
          @switch-workspace="switchWorkspace"
          @create-workspace="createWorkspace"
          @logout="handleLogout"
        ></logged-header>
        <anka-header
          v-else
          :topic="topic"
          :opacity="opacity"
          :is-login="isLogin"
          @auth="$emit('auth', $event)"
        ></anka-header>
      </transition>
    </header>
  </div>
</template>

<script>
import LoggedHeader from "./components/LoggedHeader.vue";
import AnkaHeader from "./components/AnkaHeader.vue";
import { logout } from "./api";
import { getAccount } from "../common/api";
import { rootMixin } from "../common/util/mixin";
import { getStorage, setStorage, removeStorage } from "../common/util";
// import Notification from "../common/components/Notification.vue";

export default {
  name: "RqHeader",
  components: {
    LoggedHeader,
    AnkaHeader,
    // Notification,
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
      this.$emit("switch-workspace", val);
    },
    createWorkspace() {
      this.$emit("create-workspace");
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
  }

  p {
    margin: 0;
  }
  [class^="rq"] {
    box-sizing: border-box;
  }
}
.header {
  header {
    position: relative;
    box-sizing: border-box;
    min-width: 100%;
  }
  &-wrapper {
    position: relative;
    width: 100%;
    box-shadow: 0px 2px 4px rqthemify(--shadow-container);
  }
}
</style>
