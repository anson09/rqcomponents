<template>
  <div class="menu__links">
    <template>
      <div class="menu-link-wrapper">
        <div
          v-for="(item, index) in links"
          :key="index"
          :class="[
            'menu-link',
            `level-${item.level}`,
            item.product,
            {
              product: item.icon,
              'is-root': item.isRoot,
              'is-leaf': item.isLeaf,
              'is-border': item.border,
              'is-link': item.link,
            },
          ]"
          @click="redirect(item)"
        >
          <i
            v-if="item.icon"
            :class="['icon-base', `icon-base-${item.icon}`]"
          ></i>

          <span class="menu-link__label">{{ item.label }}</span>
        </div>
      </div>
      <Support
        v-if="isSupportShow"
        :cfg="support"
        @redirect="redirect"
      ></Support>
    </template>
  </div>
</template>

<script>
import Support from "./Support.vue";

export default {
  name: "DropdownMenu",
  components: { Support },
  props: {
    links: {
      default: () => [],
      type: Array,
    },
    support: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    isSupportShow() {
      return !!Object.keys(this.support).length;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    redirect({ link }) {
      this.$emit("redirect", link);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins";

.menu {
  &__links {
    box-shadow: 0px 16px 20px 0 rqthemify(--shadow-primary);

    padding-top: 20px;
    background-color: rqthemify(--background-final);
    min-width: 250px;
  }
  &-link {
    padding: 6px 0 6px 20px;
    display: flex;
    align-items: center;
    @include text(rqthemify(--text-important), 14, 20px);
    position: relative;

    .icon-base {
      font-size: 20px;
      margin-right: 8px;
    }

    &.is-link {
      cursor: pointer;
      &:hover {
        color: rqthemify(--text-remind);
        background-color: rqthemify(--background-primary);
        &:before {
          background-color: rqthemify(--text-remind);
        }
      }
    }

    &:not(.is-root).is-link {
      padding-top: 4px;
      padding-bottom: 4px;
      margin: 2px 0;
      color: rqthemify(--text-normal);
      &:not(.product):before {
        content: "";
        position: relative;
        width: 4px;
        height: 4px;
        margin-right: 8px;
        border-radius: 50%;
        background-color: rqthemify(--text-normal);
      }
    }

    &:active {
      color: rqthemify(--primary-color);
      background-color: rqthemify(--primary-color-1);
      &:before {
        background-color: rqthemify(--primary-color);
      }
    }
    &.is-leaf + &:not(.is-leaf) {
      margin-top: 10px;
    }

    &.is-border ~ &.level-0 {
      margin-top: 31px;
      &::before {
        position: absolute;
        content: "";
        left: 15px;
        top: -14px;
        right: 16px;
        height: 1px;
        background-color: rqthemify(--border-primary);
      }
    }

    &.level-0 + &.level-0 {
      margin-top: 8px;
      &::before {
        display: none;
      }
    }

    &.level-1 {
      padding-left: 30px;
    }
    &.level-2 {
      padding-left: 40px;
    }

    &.product {
      padding: 6px 20px;
      &:active {
        color: rqthemify(--text-remind);
      }
      &:before {
        content: none;
      }
      &.level-0:not(:first-child) {
        &:before {
          position: absolute;
          content: "";
          display: block;
          left: 15px;
          top: -14px;
          right: 16px;
          height: 1px;
          background-color: rqthemify(--border-primary);
        }
      }
      &.level-0 ~ &.level-0 {
        margin-top: 27px;
      }
      $products: quant, rqams, rqdata, rqfactor, rqoptimizer;
      @each $product in $products {
        &.#{$product} {
          .icon-base {
            color: rqthemify(--#{$product}-product-color);
          }
          &:hover {
            color: rqthemify(--#{$product}-product-color);
          }
          &:active {
            background: rqthemify(--#{$product}-product-color-1);
          }
        }
      }
    }

    &-item {
      width: 254px;
      padding: 4px 0;
      position: relative;
    }
  }
}
</style>
<style lang="scss">
.nav-menu.el-popper {
  padding: 0;
  border-radius: 0;
  border-width: 0;
  box-shadow: none;
  &.fade-in-linear-leave-active.fade-in-linear-leave-to {
    opacity: 0;
    transition: all 0s;
  }
  &.el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
}
</style>
