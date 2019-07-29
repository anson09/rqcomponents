<template>
  <div class="follow__wrapper">
    <div class="follow">
      <div class="avatar">
        <img :src="info.avatar" alt="">
      </div>
      <p class="follow__title">
        {{info.name}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Follow",
  props: {
    info: {
      required: true,
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/common";

.follow {
  display: flex;
  align-items: center;
  padding: 24px;
  background: $bg-white;
  border-radius: 8px;
  &__wrapper {
    @include flex-item;
  }
  .avatar {
    position: relative;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .follow__title {
    margin-left: 24px;
    @include text($text-gray-light);
  }
}
</style>