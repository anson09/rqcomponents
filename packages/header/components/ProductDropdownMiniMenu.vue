<template>
  <div class="product-mini-menu">
    <p class="product-mini-menu__title">{{ label }}</p>
    <div
      v-for="(item, index) in links"
      :key="index"
      class="product-mini-menu-item"
    >
      <p class="product-mini-menu-item__label" @click="handleLink(item.link)">
        {{ item.label }}
      </p>
      <div v-if="item.links" class="product-mini-menu-subitem-wrapper">
        <div
          v-for="(subitem, subindex) in item.links"
          :key="subindex"
          class="product-mini-menu-subitem"
        >
          <p
            class="product-mini-menu-subitem__label"
            @click="handleLink(subitem.link)"
          >
            {{ subitem.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { config } from "./ProductDropdownMenu.vue";
import mixin from "../../common/util/mixin";

export default {
  name: "ProductDropdownMiniMenu",
  mixins: [mixin],
  data() {
    return {
      links: config,
      label: "产品",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.product-mini-menu {
  p {
    margin: 0;
  }
  &__title {
    color: rqthemify(--text-important);
    font-size: 12px;
    padding-left: 26px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  &-item {
    margin-bottom: 4px;
    &__label {
      cursor: pointer;
      font-size: 14px;
      color: rqthemify(--text-important);
      line-height: 20px;
    }
  }
  &-subitem {
    &-wrapper {
      margin-bottom: 8px;
    }
    &__label {
      color: rqthemify(--text-normal);
      font-size: 12px;
      line-height: 18px;
    }
  }
  &-subitem,
  &-item {
    &__label {
      padding: 6px 48px 6px 26px;
      cursor: pointer;
      &:hover {
        color: rqthemify(--text-remind);
        background-color: rqthemify(--background-primary);
      }
      &:active {
        background-color: rqthemify(--background-secondary);
      }
    }
  }
}
</style>
