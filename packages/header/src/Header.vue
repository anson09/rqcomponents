<template>
  <header>
    <Transition name="rq-fade-in-linear">
      <LoggedHeader
        v-if="mode === defaultMode && isLogin"
        :avatar="avatar"></LoggedHeader>
      <AnkaHeader v-else
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
    }
  },
  data() {
    let localStorageAcount;
    try {
      localStorageAcount = JSON.parse(localStorage.rqAccount);
    } catch (err) {
      localStorageAcount = {};
    }
    const { isLogin=false, avatar=""} = localStorageAcount;
    return {
      defaultMode: "default",
      isLogin,
      avatar
    }
  },
  async mounted() {
    const {data: {avatar}} = await getAccount();
    if (avatar) {
      localStorage.setItem("rqAccount", JSON.stringify({
        isLogin: true,
        avatar
      }));
      this.isLogin = true;
      this.avatar = avatar;
    } else {
      this.isLogin = false;
      this.avatar = "";
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
  height: 70px;
}
</style>
