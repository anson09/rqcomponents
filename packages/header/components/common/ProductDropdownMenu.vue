<template>
  <div class="product-menu">
    <div v-for="(item, index) in config" :key="index" class="product-menu-item">
      <div
        :class="['product-menu-item__label', item.product]"
        @click="redirect(item)"
      >
        <svg
          v-if="item.iconColorful"
          aria-hidden="true"
          :class="'icon-base-colorful'"
        >
          <use :xlink:href="`#icon-base-colorful-${item.iconColorful}`"></use>
        </svg>
        <i v-if="item.icon" :class="`icon-base icon-base-${item.icon}`" />
        {{ item.label }}
      </div>
      <div class="product-menu-subitem">
        <div
          v-for="(subitem, subindex) in item.links"
          :key="subindex"
          :class="['product-menu-subitem__label', subitem.product]"
          @click="redirect(item)"
        >
          {{ subitem.label }}
        </div>
      </div>
    </div>
    <Suppoort :cfg="support" />
  </div>
</template>
<script>
import Suppoort from "./Support.vue";

export default {
  name: "ProductDropdownMenu",
  components: { Suppoort },
  props: {
    config: { type: Array, required: true },
    support: { type: Object, required: true },
  },
  data() {
    return {};
  },
  methods: {
    redirect({ link }) {
      this.$emit("redirect", link);
    },
  },
};
</script>
<style lang="scss" scoped>
.product-menu {
  width: 250px;
  background: rqthemify(--background-final);
  box-shadow: 0px 16px 20px 0 rqthemify(--shadow-primary);
  padding-top: 6px;
  &-item {
    line-height: 32px;
    margin: 14px 0;
    display: flex;
    flex-direction: column;
    position: relative;
    &__label {
      font-size: 14px;
      color: rqthemify(--text-important);
      padding-left: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    &:after {
      position: absolute;
      content: "";
      left: 16px;
      right: 16px;
      height: 1px;
      background-color: rqthemify(--border-primary);
      bottom: -7px;
    }

    $products: quant, rqsdk, rqalphaplus, rqams, rqdata, rqfactor, rqoptimizer;
    @each $product in $products {
      .#{$product} {
        .icon-base,
        .icon-base-colorful {
          opacity: 0.8;
          margin-right: 8px;
          font-size: 20px;
        }
        &:hover {
          color: rqthemify(--#{$product}-product-color);
          .icon-base {
            opacity: 1;
          }
        }
        &:active {
          background: rqthemify(--#{$product}-product-color-1);
        }
      }
    }
    $products: rqams;
    @each $product in $products {
      .#{$product} {
        .icon-base {
          color: rqthemify(--#{$product}-product-color);
        }
      }
    }
  }
  &-subitem {
    &__label {
      cursor: pointer;
      font-size: 12px;
      color: rqthemify(--text-normal);
      padding-left: 48px;
    }
  }
  &-item,
  &-subitem {
    &__label {
      font-weight: 500;
      &:hover {
        background-color: rqthemify(--background-secondary);
      }
    }
  }
}
</style>
