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
      localStorageAcount = JSON.parse(localStorage.rqAccount);
    } catch (err) {
      localStorageAcount = {};
    }
    // const { isLogin=false, avatar="", fullname: username="" } = localStorageAcount;
    const { isLogin=false, avatar="", fullname: username="" } = {"isLogin":true,"avatar":"https://qcdn.ricequant.com/img/avatar/2826c291-275b-4bea-9176-25e19e4ba6d4.png"};
    return {
      defaultMode: "default",
      isLogin,
      username,
      avatar
    }
  },
  mounted() {
    // this.initAccount();
  },
  methods: {
    async initAccount() {
      try {
	const {data: {code, fullname, avatar, phone}} = await getAccount();
	if (code === 0) {
          localStorage.setItem("rqAccount", JSON.stringify({
            isLogin: true,
            avatar
          }));
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
      localStorage.removeItem("rqAccount");
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
