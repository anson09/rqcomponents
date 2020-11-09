<template>
  <nav :class="['rq-header-nav', { 'is-opacity': opacity }]">
    <span
      v-for="(item, index) in config"
      :key="index"
      class="rq-header-nav__item"
      @click="handleLink(item.link)"
    >
      <span class="rq-header-nav__label">{{ item.label }}</span>
      <template v-if="item.component">
        <i class="rq-header-icon el-icon-arrow-up" />
        <div class="rq-header-nav__dropdown-wrapper">
          <component :is="item.component" class="rq-header-nav__dropdown" />
        </div>
      </template>
    </span>
  </nav>
</template>

<script>
import DocDropdownMenu from "../../common/components/DocDropdownMenu.vue";
import ProductDropdownMenu from "./ProductDropdownMenu.vue";
import mixin from "../../common/util/mixin";

export default {
  name: "Nav",
  components: {
    DocDropdownMenu,
    ProductDropdownMenu,
  },
  mixins: [mixin],
  props: {
    opacity: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      config: [
        { label: "产品", component: "ProductDropdownMenu" },
        { label: "定价", link: { href: "/pricing" } },
        { label: "支持", component: "DocDropdownMenu" },
        { label: "教育专区", link: { href: "/edu" } },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../common/style/mixins.scss";

.rq-header-nav {
  flex: 1;
  margin: 0 20px;
  height: 100%;
  @include f-center(start);
  color: rqthemify(--text-primary);
  &.is-opacity {
    color: rqthemify(--border-primary);
  }

  &__item {
    position: relative;
    padding: 0 20px;
    height: 100%;
    @include f-center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    .rq-header-nav__dropdown {
      border-top-left-radius: 0;
      box-shadow: 0px 16px 20px 0 rqthemify(--shadow-primary);
      &-wrapper {
        position: absolute;
        left: 0;
        top: 100%;
        display: none;
      }
    }
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: transparent;
    }
    &:hover {
      color: rqthemify(--light-primary-color);
      background: rqthemify(--background-white);
      box-shadow: 0px 0px 8px 0px rqthemify(--shadow-primary);
      &:after {
        background-color: rqthemify(--light-primary-color);
      }
      .el-icon-arrow-up {
        transform: rotate(180deg);
      }
      .rq-header-nav__dropdown-wrapper {
        display: block;
      }
    }
  }

  &__label {
    height: 100%;
    @include f-center;
    margin-right: 8px;
  }
}
</style>
