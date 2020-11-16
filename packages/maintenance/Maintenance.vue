<template functional>
  <div class="rq-maintenance">
    <img
      src="./assets/img/maintenance.png"
      alt=""
      class="rq-maintenance__img"
    />
    <p class="rq-maintenance__text">系统维护中</p>
    <p class="rq-maintenance__text">工作辛苦了，喝杯咖啡休息一下吧！</p>
    <p v-if="props.date" class="rq-maintenance__text">
      维护时间：{{ props.date }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Maintenance",
  props: {
    date: { type: String, default: undefined },
  },
};
</script>
<style lang="scss" scoped>
@import "../common/style/mixins.scss";
@include reset;
@include block(maintenance) {
  background: rqthemify(--background-final);
  width: 100%;
  height: 100%;
  @include f-column;
  color: rqthemify(--text-normal);
  font-size: 16px;
  line-height: 44px;
  &__img {
    margin-bottom: 30px;
  }
}
</style>
