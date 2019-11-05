<template>
  <header>
    <Transition name="rq-fade-in-linear">
      <LoggedHeader
        v-if="mode === defaultMode && isLogin"
        :username="username"
        :avatar="avatar"
      ></LoggedHeader>
      <AnkaHeader
        v-else
        :topic="topic"
        :opacity="opacity"
        :isLogin="isLogin"
      ></AnkaHeader>
    </Transition>
  </header>
</template>

<script>
import LoggedHeader from "./components/LoggedHeader.vue";
import AnkaHeader from "./components/AnkaHeader.vue";
import { getAccount, logout } from "../api";

export default {
  name: "RqHeader",
  components: {
    LoggedHeader,
    AnkaHeader
  },
  props: {
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
      fullname: username = ""
    } = localStorageAcount;
    return {
      defaultMode: "default",
      isLogin,
      username,
      avatar
    };
  },
  mounted() {
    this.initAccount();
  },
  methods: {
    async initAccount() {
      try {
        const {
          data: { code, fullname, avatar, phone, email, userId }
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
              userId
            })
          );
          this.isLogin = true;
          this.avatar = avatar;
          this.username = fullname;
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
      localStorage.removeItem("common_account");
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
</style>
