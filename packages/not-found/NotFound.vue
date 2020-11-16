<template>
  <div class="rq-not-found"><img src="./assets/img/404.png" /></div>
</template>

<script>
export default {
  name: "RqNotFound",
};
</script>

<style lang="scss" scoped>
@import "../common/style/mixins.scss";
@include reset;

@include block(not-found) {
  @include f-center;
  height: 100%;
  width: 100%;
}
</style>
