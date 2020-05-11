<template>
  <div
    v-if="isShow"
    :class="`second-header ${config.name}`"
    :style="{ transform: `translate(-${windowScrollX}px, ${scrollY}px)` }"
  >
    <div class="header__bg"></div>
    <nav>
      <div class="nav__products">
        <template v-for="(item, index) in config.products">
          <span
            v-if="item.icon"
            :key="index"
            :class="{ 'is-active': isActive(item.path) }"
            class="nav__icon"
            @click="clickHandle(item.path)"
          >
            <i :class="`icon-base icon-base-${item.icon}`"></i>
            <span class="main-label">{{ item.mainLabel }}</span>
            <span class="second-label">{{ item.secondLabel }}</span>
          </span>
          <common-button
            v-else
            :key="index"
            :class="{ 'is-active': isActive(item.path) }"
            class="nav__product"
            :label="item.label"
            @click="clickHandle(item.path)"
          ></common-button>
        </template>
      </div>
      <div class="nav__buttons">
        <common-button
          class="nav__button"
          :plain="true"
          label="免费试用"
          @click="clickHandle(config.trialHref)"
        ></common-button>
      </div>
    </nav>
  </div>
</template>
<script>
import CommonButton from "./CommonButton.vue";

const path2config = [
  {
    name: "rqdata",
    products: [
      {
        icon: "rqdata",
        mainLabel: "RQData",
        secondLabel: "金融数据API",
        path: "/rqdata",
      },
    ],
    trialHref: "/pricing#rqdata",
  },
  {
    name: "rqams",
    products: [
      {
        icon: "rqams",
        mainLabel: "RQAMS",
        secondLabel: "米筐资产管理系统",
        path: "/ams",
      },
    ],
    trialHref: "/pricing#rqams",
  },
  {
    name: "rqoptimizer",
    products: [
      {
        icon: "rqoptimizer",
        mainLabel: "RQOptimizer",
        secondLabel: "组合优化器",
        path: "/rqoptimizer",
      },
    ],
    trialHref: "/pricing#rqoptimizer",
  },
  {
    name: "quant",
    products: [
      {
        mainLabel: "Ricequant",
        secondLabel: "米筐量化",
        icon: "quant",
        path: "/quant",
      },
      { label: "RQAlpha Plus", path: "/quant/rq-alpha-plus" },
      // { label: "实盘交易", value: "real-trading" },
      { label: "因子研究", path: "/quant/factor" },
      { label: "RQSDK", path: "/quant/rq-sdk" },
      { label: "本地部署", path: "/quant/local" },
    ],
    trialHref: "/trial/rq-quant",
  },
];

export const getSecondHeaderShow = (path) =>
  path2config
    .reduce(
      (arr, cur) => [...arr, ...cur.products.map((item) => item.path)],
      []
    )
    .includes(path);

export default {
  name: "SecondHeader",
  components: { CommonButton },
  props: {},
  data() {
    return {
      scrollFn: null,
      windowScrollX: 0,
      windowScrollY: 0,
    };
  },
  computed: {
    isShow() {
      return getSecondHeaderShow(this.$parent.getPath());
    },

    config() {
      return path2config.filter(({ products }) =>
        products.map(({ path }) => path).includes(this.$parent.getPath())
      )[0];
    },

    scrollY() {
      return this.windowScrollY <= 70 ? 70 - this.windowScrollY : 0;
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
    isActive(path) {
      return this.$parent.getPath() === path;
    },
    clickHandle(href) {
      if (href && this.$parent.getPath() !== href) {
        this.$emit("redirect", href);
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../../common/style/mixins";

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
  .icon-base {
    color: rqthemify(text);
  }

  $products: rqdata, rqams, rqoptimizer, quant;
  @each $product in $products {
    &.#{$product} {
      color: rqthemify($product);
      .is-active {
        .icon-base {
          color: rqthemify($product);
        }
      }

      .nav__button {
        color: rqthemify($product);
        border-color: rqthemify($product);
      }
    }
  }
  $products: quant;
  @each $product in $products {
    &.#{$products} {
      .nav__product {
        background: rqthemify(#{$product}-sub-product-bg);
        &.is-active {
          background: rqthemify($product);
          color: rqthemify(text-white);
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
    justify-content: space-between;

    .nav__products {
      display: flex;
      align-items: center;
    }

    .nav__icon {
      cursor: pointer;

      .icon-base {
        font-size: 28px;
        margin-right: 13px;
      }

      .main-label {
        @include h3(rqthemify(text-dark));
      }

      .second-label {
        @include rg-text(rqthemify(text-dark));
        margin-left: 13px;
        margin-right: 17px;
      }
    }
    .nav__product {
      margin: 0 13px;
      border: none;
      padding: 5px 12px;
      border-radius: 6px;
      color: rqthemify(text);
    }

    .nav__button {
      padding: 12px 28px;
      line-height: 1;
      border-radius: 8px;
    }
  }
}
</style>
