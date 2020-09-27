<template>
  <div class="products">
    <div
      v-for="(item, index) in config"
      :key="index"
      :class="['product__item', { 'is-active': item.active }]"
      @click="handleLink(item.link)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<script>
import mixin from "../../../common/util/mixin";

export default {
  name: "Products",
  mixins: [mixin],
  props: {
    config: { type: Array, required: true },
  },
  data() {
    return {};
  },
  computed: {
    products() {
      return this.config.map((item) => ({
        ...item,
        active: item.link.href.includes(this.getFirstPath()),
      }));
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  &s {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
