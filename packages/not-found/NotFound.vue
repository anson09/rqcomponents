<template>
  <div class="rq-not-found">
    <RqPicture
      :src="{
        avif,
        webp,
        fallback,
      }"
    />
  </div>

  <!-- <div><img src="./assets/img/404.png" /></div> -->
</template>

<script>
import RqPicture from "../picture/index";
import avif from "./assets/img/404.avif";
import webp from "./assets/img/404.webp";
import fallback from "./assets/img/404.png";

export default {
  name: "RqNotFound",
  components: { RqPicture },
  data() {
    return {
      avif,
      webp,
      fallback,
    };
  },
};
</script>

<style lang="scss" scoped>
.rq-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  min-height: 600px;
}
</style>
