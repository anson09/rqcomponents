<template>
  <div
    v-if="isShow"
    :class="`second-header ${icon}`"
    :style="{ transform: `translate(-${windowScrollX}px, ${scrollY}px)` }"
  >
    <div class="header__bg"></div>
    <nav>
      <div class="nav__icon" @click="clickHandle()">
        <i
          :class="[`rq-icons rq-icon-${icon}`, { 'is-active': isIconActive }]"
        ></i>
        <span class="main-title">{{ mainTitle }}</span>
        <span class="second-title">{{ secondTitle }}</span>
      </div>
      <div class="nav__pro">
        <template v-if="subProducts">
          <common-button
            v-for="(pro, idx) in subProducts"
            :key="idx"
            :class="[
              'nav__pro-item',
              { 'is-active': curSubProduct === pro.value },
            ]"
            :label="pro.label"
            @click="clickHandle(getSubProductPath(pro))"
          ></common-button>
        </template>
      </div>
      <div class="nav__buttons">
        <common-button
          class="nav__button"
          :plain="true"
          label="免费试用"
          @click="clickHandle(redirect)"
        ></common-button>
      </div>
    </nav>
  </div>
</template>
<script>
import CommonButton from "./CommonButton.vue";

export const path2config = {
  "/rqdata": {
    icon: "rqdata",
    mainTitle: "RQData",
    secondTitle: "金融数据API",
    product: "rqdata",
  },
  "/rqpro": {
    icon: "rqpro",
    mainTitle: "RQPro",
    secondTitle: "量化投研终端",
    product: "rqpro",
  },
  "/ams": {
    icon: "rqams",
    mainTitle: "RQAMS",
    secondTitle: "米筐资产管理系统",
    product: "rqams",
  },
  "/rqoptimizer": {
    icon: "rqoptimizer",
    mainTitle: "RQOptimizer",
    secondTitle: "组合优化器",
    product: "rqoptimizer",
  },
  "/quant": {
    icon: "quant",
    mainTitle: "Ricequant",
    secondTitle: "米筐量化",
    product: "quant",
    subProducts: [
      { label: "RQAlpha Plus", value: "rq-alpha-plus" },
      // { label: "实盘交易", value: "real-trading" },
      { label: "因子研究", value: "factor" },
      { label: "RQSDK", value: "rq-sdk" },
      { label: "本地部署", value: "local" },
    ],
  },
};

export default {
  name: "SecondHeader",
  components: { CommonButton },
  props: {},
  data() {
    return {
      usePageLink: Object.keys(path2config),
      scrollFn: null,
      windowScrollX: 0,
      windowScrollY: 0,
    };
  },
  computed: {
    isShow() {
      return this.usePageLink.includes(this.$parent.getTopPath());
    },
    isIconActive() {
      return this.usePageLink.includes(this.$parent.getPath());
    },
    config() {
      return path2config[this.$parent.getTopPath()];
    },
    icon() {
      return this.findInConfig("icon");
    },
    mainTitle() {
      return this.findInConfig("mainTitle");
    },
    subProducts() {
      return this.findInConfig("subProducts");
    },
    secondTitle() {
      return this.findInConfig("secondTitle");
    },
    redirect() {
      return `/pricing#${this.findInConfig("product")}`;
    },
    scrollY() {
      return this.windowScrollY <= 70 ? 70 - this.windowScrollY : 0;
    },
    curSubProduct() {
      return this.$parent
        .getPath()
        .replace(`${this.$parent.getTopPath()}/`, "");
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.scrollFn = window.addEventListener("scroll", () => {
      // Fallback for ie
      this.windowScrollY = window.scrollY || window.pageYOffset;
      this.windowScrollX = window.scrollX || window.pageXOffset;
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFn);
  },
  methods: {
    clickHandle(href) {
      const redirectHref = href || this.$parent.getTopPath();
      if (redirectHref && this.$parent.getPath() !== redirectHref) {
        this.$emit("redirect", redirectHref);
      }
    },
    getSubProductPath(subProduct) {
      return `/${this.findInConfig("product")}/${subProduct.value}`;
    },
    findInConfig(key) {
      if (this.config) {
        return this.config[key];
      }
      return "";
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../../common/style/common";

.second-header {
  position: fixed;
  top: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 60px;
  @include full-vw;
  &.rqoptimizer {
    min-width: 1024px;
  }
  .header__bg {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rqthemify(bg-white);
    box-shadow: 0px 10px 11px 0px rgba(8, 25, 52, 0.1);
  }
  .rq-icons {
    color: rqthemify(text);
  }

  $products: rqdata, rqams, rqoptimizer, quant;
  @each $product in $products {
    &.#{$product} {
      .rq-icons.is-active {
        color: rqthemify($product);
      }
      .nav__button {
        color: rqthemify($product);
        border-color: rqthemify($product);
      }
    }
  }
  $products: quant;
  @each $product in $products {
    &.#{$product} {
      .nav__pro-item {
        background: rqthemify(#{$product}-sub-product-bg);
        &.is-active {
          background: rqthemify($product);
        }
      }
    }
  }

  nav {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 0 50px;
    height: 100%;

    .nav__icon {
      cursor: pointer;
      display: flex;
      align-items: center;

      .rq-icons {
        font-size: 28px;
        margin-right: 13px;
      }

      &__title {
        width: 30px;
      }

      .main-itle {
        @include h3(rqthemify(text-dark));
      }

      .second-title {
        @include rg-text(rqthemify(text-dark));
        margin-left: 13px;
        margin-right: 17px;
      }
    }
    .nav__pro {
      flex: 1;
      &-item {
        margin: 0 13px;
        border: none;
        padding: 5px 12px;
        border-radius: 6px;
        color: rqthemify(text);
        &.is-active {
          color: rqthemify(text-white);
        }
      }
    }

    .nav__button {
      padding: 12px 28px;
      line-height: 1;
      border-radius: 8px;
    }
  }
}
</style>
