<template>
  <div class="rq-header-menu">
    <p class="rq-header-menu__title">{{ label }}</p>
    <div
      v-for="(item, index) in links"
      :key="index"
      class="rq-header-menu__item"
    >
      <p
        class="rq-header-menu__label rq-header-menu__label--default"
        @click="handleLink(item.link)"
      >
        {{ item.label }}
      </p>
      <div v-if="item.links" class="rq-header-menu__item--mini">
        <div v-for="(subitem, subindex) in item.links" :key="subindex">
          <p
            class="rq-header-menu__label rq-header-menu__label--mini"
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
@import "../style/mixins.scss";
@include block(menu) {
  &__title {
    font-size: 12px;
    padding-left: 26px;
    line-height: 18px;
    margin-bottom: 8px;
  }
  &__item {
    margin-bottom: 4px;
    &--mini {
      margin-bottom: 8px;
    }
  }
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
    &--default {
      cursor: pointer;
      font-size: 14px;
      color: rqthemify(--text-important);
      line-height: 20px;
    }
    &--mini {
      color: rqthemify(--text-normal);
      font-size: 12px;
      line-height: 18px;
    }
  }
}
</style>
