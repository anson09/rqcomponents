<template>
  <div
    v-if="isShow"
    :class="`rq-header-more ${product.name}`"
    :style="{ transform: `translate(-${windowScrollX}px, ${scrollY}px)` }"
  >
    <div class="rq-header-more__bg"></div>
    <!-- <nav> -->
    <div class="rq-header-more__nav">
      <div
        class="rq-header-more__label-wrapper"
        @click="handleLink(product.link)"
      >
        <i v-if="product.icon" :class="`icon-base icon-base-${product.icon}`" />
        <svg
          v-if="product.iconColorful"
          id=""
          aria-hidden="true"
          :class="'icon-base-colorful'"
        >
          <use
            :xlink:href="`#icon-base-colorful-${product.iconColorful}`"
          ></use>
        </svg>
        <span class="rq-header-more__label">{{ product.label }}</span>
      </div>
      <div class="rq-header-more__links">
        <template v-if="product.links">
          <span
            v-for="(item, index) in product.links"
            :key="index"
            :class="[
              'rq-header-more__label rq-header-more__link',
              { 'is-active': isActive(item.link) },
            ]"
            @click="handleLink(item.link)"
          >
            {{ item.label }}
          </span>
        </template>
      </div>
      <button
        class="rq-header-more__button"
        @click="handleLink(product.trialLink)"
      >
        免费试用
      </button>
    </div>
  </div>
</template>
<script>
import mixin from "../../common/util/mixin";

export default {
  name: "SecondHeader",
  mixins: [mixin],

  data() {
    return {
      scrollY: 0,
      windowScrollX: 0,

      config: [
        {
          name: "rqdata",
          iconColorful: "rqdata",
          label: "RQData 金融数据API",
          link: "/rqdata",
          trialLink: "/trial/rqsdk-cloud",
        },
        {
          name: "rqams",
          icon: "logo-ams",
          label: "RQAMS 米筐资产管理系统",
          link: "/ams",
          links: [
            {
              label: "产品组合管理",
              link: "/ams/portfolio-management",
            },
            {
              label: "投后分析",
              link: "/ams/post-investment-analysis",
            },
            {
              label: "风险管理",
              link: "/ams/risk-management",
            },
          ],
          trialLink: "/pricing#rqams",
        },
        {
          name: "rqoptimizer",
          iconColorful: "rqoptimizer",
          label: "RQOptimizer 米筐股票优化器",
          link: "/rqoptimizer",
          trialLink: "/trial/rqsdk-cloud",
        },
        {
          name: "quant",
          iconColorful: "logo-ricequant",
          label: "Ricequant 米筐量化协作平台",
          link: "/quant",
          trialLink: "/trial/rq-quant",
        },
        {
          name: "rqalphaplus",
          iconColorful: "rqalpha",
          label: "RQAlpha Plus 米筐量化策略引擎",
          link: "/rq-alpha-plus",
          trialLink: "/trial/rqsdk-cloud",
        },
        {
          name: "rqfactor",
          iconColorful: "rqfactor",
          label: "RQFactor 因子研究",
          link: "/rq-factor",
          trialLink: "/trial/rqsdk-cloud",
        },
        {
          name: "rqsdk",
          iconColorful: "logo-sdk",
          label: "RQSDK 米筐量化工具套件",
          link: "/rq-sdk",
          trialLink: "/trial/rqsdk-cloud",
        },
      ],
    };
  },
  computed: {
    isShow() {
      return !!this.product;
    },

    product() {
      return this.config.find((item) =>
        [item.link, ...(item.links?.map(({ link }) => link) ?? [])].includes(
          this.getPath()
        )
      );
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.headerHeight =
      (document.querySelector(".rq-notification")?.offsetHeight ?? 0) + 70;
    this.scrollFn();
    window.addEventListener("scroll", this.scrollFn);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollFn);
  },
  methods: {
    scrollFn() {
      // Fallback for ie
      const windowScrollY = window.scrollY || window.pageYOffset;
      this.scrollY =
        windowScrollY <= this.headerHeight
          ? this.headerHeight - windowScrollY
          : 0;

      this.windowScrollX = window.scrollX || window.pageXOffset;
    },
    isActive(path) {
      return this.getPath() === path;
    },
  },
};
</script>
<style scoped lang="scss">
@import "../style/mixins.scss";
@include block(more) {
  $self: &;
  position: fixed;
  z-index: 9;
  top: 0;
  @include f-center;
  height: 60px;
  width: 100%;
  min-width: $medium-vw;
  &__bg {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rqthemify(--background-white);
    box-shadow: 0px 10px 11px 0px rqthemify(--shadow-primary);
  }

  &__nav {
    height: 100%;
    @include f-center(space-between);
    padding: 0 16px;
    width: 100%;
    max-width: $max-vw;
  }

  &__links {
    flex: 1;
    @include f-center(flex-start);
    height: 100%;
  }

  .icon-base {
    font-size: 28px;
  }
  .icon-base-colorful {
    width: 28px;
    height: 28px;
  }

  .icon-base,
  .icon-base-colorful {
    margin-right: 12px;
  }
  &__label {
    color: rqthemify(--text-primary);
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    margin-right: 32px;
    &-wrapper {
      height: 100%;
      @include f-center;
    }
  }

  &__button {
    flex: none;
    padding: 12px 28px;
    line-height: 1;
    border-radius: 8px;
    font-size: 14px;
    border: 1px solid;
  }

  &__link {
    position: relative;
    @include f-center;
    height: 100%;
    &.is-active,
    &:hover {
      color: rqthemify(--text-primary);
      transform: scaleX(1.05);
    }

    &:after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
      transition: width 0.3s ease;
    }
    &:hover {
      &:after {
        background: rqthemify(--light-primary-color);
        width: 100%;
      }
    }
  }

  $products: quant, rqsdk, rqalphaplus, rqams, rqdata, rqfactor, rqoptimizer;
  @each $product in $products {
    &.#{$product} {
      .icon-base {
        color: rqthemify(--#{$product}-product-color);
      }

      #{$self}__link {
        &.is-active {
          color: rqthemify(--#{$product}-product-color);
          &:after {
            background: rqthemify(--#{$product}-product-color);
            width: 100%;
          }
        }
      }

      #{$self}__button {
        color: rqthemify(--#{$product}-product-color);
        border-color: rqthemify(--#{$product}-product-color);
        &:hover {
          color: rqthemify(--text-white);
          background-color: rqthemify(--#{$product}-product-color-9);
        }
        &:active,
        &:focus {
          color: rqthemify(--text-white);
          background-color: rqthemify(--#{$product}-product-color);
        }
      }
    }
  }
}
</style>
