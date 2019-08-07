<template>
  <div class="empty">
    <p class="empty__logo">
      <i class="rq-icons rq-icon-empty"></i>
    </p>
    <p class="empty__title">
      {{emptyText}}
      {{emptyLabel}}
    </p>
  </div>
</template>
<script>
export default {
  name: "Empty",
  props: {
    emptyText: {
      default: "暂时没有",
      type: String
    },
    emptyLabel: {
      default: "粉丝",
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/common";

.empty {
  padding: 40px 0;
  width: 100%;
  @include f-column;
  background: $bg-white;
  .empty__logo i{
    @include text($text-gray-light, 40);
  }
  .empty__title {
    margin-top: 16px;
    @include text($text-gray-light);
  }
}
</style>