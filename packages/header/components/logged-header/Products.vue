<template>
  <div class="product">
    <div
      v-for="(item, index) in config"
      :key="index"
      :class="['product__item', 'is-active']"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script>
export default {
  name: "Products",
  props: {
    config: { type: Object, required: true },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.product {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &__item {
    font-size: 14px;
    line-height: 20px;
    padding: 4px 18px;
    margin: 0 2px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rqthemify(--primary-color);
      color: rqthemify(--white);
    }
    &:active,
    &.is-active {
      color: rqthemify(--text-hover);
      background-color: rqthemify(--primary-color-1);
    }
  }
}
</style>
