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
    return {
      defaultMode: "default",
      isLogin: false,
      avatar: ""
    }
  },
  async mounted() {
    const {data: {avatar}} = await getAccount();
    if (avatar) {
      this.isLogin = true;
      this.avatar = avatar;
    } else {
      this.isLogin = false;
      this.avatar = "";
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
