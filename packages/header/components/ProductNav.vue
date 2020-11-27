<template>
  <div class="rq-header-nav">
    <div
      v-for="(item, index) in config.links"
      :key="index"
      :class="[
        'rq-header-nav__item',
        {
          'is-active': $route.path.startsWith(item.link),
        },
      ]"
      @click="handleLink(item.link)"
    >
      <svg aria-hidden="true" class="icon-base-colorful">
        <use :xlink:href="`#icon-base-colorful-${item.icon}`"></use>
      </svg>
      <span> {{ item.label }} </span>
    </div>
  </div>
</template>
<script>
import { handleLink } from "../../common/util/index";

export default {
  name: "ProductNav",
  props: { config: { type: Object, default: () => ({}) } },
  methods: {
    handleLink,
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins.scss";
@include block(nav) {
  height: 100%;
  flex: 1;
  @include f-center;
  color: rqthemify(--text-normal);
  font-size: 14px;
  &__item {
    @include f-center;
    position: relative;
    height: 100%;
    padding: 0px 16px 0 10px;
    cursor: pointer;
    .icon-base-colorful {
      filter: grayscale(80%);
      opacity: 0.6;
      margin-right: 4px;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      @include t-center-horizontal;
      width: 100%;
      height: 2px;
      border-radius: 1px;
    }
    &:hover {
      &:after {
        background-color: rqthemify(--primary-color-4);
      }
    }

    &.is-active,
    &:active {
      color: rqthemify(--primary-color);
      .icon-base-colorful {
        filter: none;
        opacity: 1;
      }
      &:after {
        background-color: rqthemify(--primary-color);
      }
    }
  }
}
</style>
