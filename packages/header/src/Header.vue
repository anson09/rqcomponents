<template>
  <div class="header-wrapper">
    <p class="header-warning" v-if="showWarning">
      <slot v-if="$slots.notification" name="notification"></slot>
      <template v-else>
        {{ notification }}
      </template>
    </p>
    <header>
      <Transition name="rq-fade-in-linear">
        <LoggedHeader
          v-if="mode === defaultMode && !isLogin"
          :username="username"
          :avatar="avatar"
          :isVip="isVip"
        ></LoggedHeader>
        <AnkaHeader
          v-else
          :topic="topic"
          :opacity="opacity"
          :isLogin="isLogin"
        ></AnkaHeader>
      </Transition>
    </header>
  </div>
</template>

<script>
import LoggedHeader from "./components/LoggedHeader.vue";
import AnkaHeader from "./components/AnkaHeader.vue";
import { getAccount } from "../api";

export default {
  name: "RqHeader",
  components: {
    LoggedHeader,
    AnkaHeader
  },
  props: {
    notification: {
      default: "",
      type: String
    },
    mode: {
      default: "default",
      type: String
    },
    opacity: {
      default: false,
      type: Boolean
    },
    topic: {
      default: "",
      type: String
    }
  },
  data() {
    let localStorageAcount;
    try {
      localStorageAcount = JSON.parse(localStorage.common_account);
    } catch (err) {
      localStorageAcount = {};
    }
    const {
      isLogin = false,
      avatar = "",
      fullname: username = "",
      rank = 0
    } = localStorageAcount;
    return {
      defaultMode: "default",
      isLogin,
      username,
      avatar,
      rank
    };
  },
  computed: {
    isVip() {
      return !isNaN(this.rank) && this.rank === 5;
    },
    showWarning() {
      return this.$slots.notification || this.notification;
    }
  },
  mounted() {
    this.initAccount();
  },
  methods: {
    async initAccount() {
      try {
        const {
          data: { code, fullname, avatar, phone, email, userId, rank }
        } = await getAccount();
        if (code === 0) {
          localStorage.setItem(
            "common_account",
            JSON.stringify({
              isLogin: true,
              fullname,
              avatar,
              phone,
              email,
              userId,
              rank
            })
          );
          this.isLogin = true;
          this.avatar = avatar;
          this.username = fullname;
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
      localStorage.removeItem("common_account");
    }
  }
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
