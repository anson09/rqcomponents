<template>
  <div v-clickoutside="handleClickOutside" class="rq-header-menu">
    <div v-show="dropdownVisible" class="rq-header-menu__dropdown">
      <div
        v-for="(item, index) in config"
        :key="index"
        :class="[
          'rq-header-menu__dropdown-item',
          { 'is-active': item.isActive },
        ]"
        @click="handleLink(item.link)"
      >
        <span
          v-if="item.isActive"
          class="rq-header-menu__dropdown-annulus"
        ></span>
        {{ item.label }}
      </div>
    </div>
    <span
      :class="[
        'rq-header-tooltip-wrapper',
        { 'is-tooltip-hidden is-icon-active': dropdownVisible },
      ]"
      @click="toggleDropdownVisible"
    >
      <i class="icon-base icon-base-switch-products active-icon"></i>
      <Tooltip :text="tooltipText" />
    </span>
  </div>
</template>
<script>
import Tooltip from "./Tooltip.vue";
import dropdownMixin from "./dropdown-mixin";
import { handleLink } from "../../common/util/index";

export default {
  name: "ProductMenu",
  components: { Tooltip },
  mixins: [dropdownMixin],
  props: {
    config: { type: Array, required: true },
  },
  data() {
    return {
      tooltipText: "切换产品",
    };
  },
  methods: {
    handleLink,
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins.scss";

@include block(menu) {
  position: relative;
  width: 28px;
  line-height: 1;

  &__dropdown {
    overflow: hidden;
    font-size: 14px;
    width: 210px;
    position: absolute;
    left: -24px;
    top: 100%;
    background: var(--bg-primary);
    box-shadow: 0px 2px 4px var(--primary-color-1);
    border-radius: 4px;
    color: var(--text-normal);
    transform: translateY(8px);
    line-height: 20px;
    &-item {
      position: relative;
      padding: 12px 34px;
      cursor: pointer;
      &:hover {
        background-color: var(--bg-secondary);
      }
      &.is-active {
        color: var(--primary-color);
      }
    }
    &-annulus {
      position: absolute;
      @include t-center-vertical;
      width: 8px;
      height: 8px;
      left: 16px;
      border-radius: 50%;
      box-shadow: 0px 0px 4px var(--primary-color);
      background: var(--primary-color);
      &:after {
        content: "";
        width: 4px;
        height: 4px;
        display: block;
        position: absolute;
        @include t-center;
        border-radius: 50%;
        background: var(--bg-primary);
      }
    }
  }
}

@include block(tooltip-wrapper) {
  @include f-column;
  @include tooltip-wrapper;
  @include icon-container("icon-base-switch-products", 18);
  color: var(--primary-color-4);
  .icon-base-switch-products.active-icon {
    display: inline-block;
  }
  &.is-icon-active {
    background-color: var(--primary-color-1);
    box-shadow: 0px 4px 4px var(--primary-color-2);
  }
  ::v-deep {
    @include block(tooltip) {
      left: 28px;
      &__arrow {
        left: 30%;
      }
    }
  }
}
</style>
