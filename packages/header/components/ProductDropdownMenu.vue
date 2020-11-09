<template>
  <div class="product-menu">
    <div v-for="(item, index) in config" :key="index" class="product-menu-item">
      <div
        :class="['product-menu-item__label', item.product]"
        @click="handleLink(item.link)"
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
          @click="handleLink(subitem.link)"
        >
          {{ subitem.label }}
        </div>
      </div>
    </div>
    <Support />
  </div>
</template>
<script>
import mixin from "../../common/util/mixin";
import Support from "./Support.vue";

const config = [
  {
    label: "米筐量化协作平台",
    iconColorful: "logo-ricequant",
    link: "/quant",
    product: "quant",
    border: true,
  },
  {
    label: "RQSDK米筐量化工具套件",
    iconColorful: "logo-sdk",
    link: "/rq-sdk",
    product: "rqsdk",
    links: [
      {
        label: "RQData 金融数据API",
        link: "/rqdata",
        product: "rqdata",
      },
      {
        label: "RQAlpha Plus 回测框架",
        link: "/rq-alpha-plus",
        product: "rqalphaplus",
      },

      {
        label: "RQFactor 因子投研工具",
        link: "/rq-factor",
        product: "rqfactor",
      },
      {
        label: "RQOptimizer 股票组合优化器",
        link: "/rqoptimizer",
        product: "rqoptimizer",
      },
    ],
  },
  {
    label: "RQAMS（资产管理系统）",
    icon: "logo-ams",
    link: "/ams",
    product: "rqams",
  },
];
export { config };
export default {
  name: "ProductDropdownMenu",
  components: { Support },
  mixins: [mixin],
  data() {
    return { config };
  },
  methods: {},
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
