<template>
  <div
    v-if="isShow"
    :class="`second-header ${product.name}`"
    :style="{ transform: `translate(-${windowScrollX}px, ${scrollY}px)` }"
  >
    <div class="header__bg"></div>
    <nav>
      <div class="nav__products">
        <template v-for="(item, index) in product.products">
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
          <span
            v-else
            :key="index"
            :class="['nav__product', { 'is-active': isActive(item.path) }]"
            @click="clickHandle(item.path)"
          >
            {{ item.label }}
          </span>
        </template>
      </div>
      <div class="nav__buttons">
        <common-button
          class="nav__button"
          :plain="true"
          label="免费试用"
          @click="clickHandle(product.trialHref)"
        ></common-button>
      </div>
    </nav>
  </div>
</template>
<script>
import CommonButton from "./CommonButton.vue";

export default {
  name: "SecondHeader",
  components: { CommonButton },
  props: {
    config: { type: Array, required: true },
  },
  data() {
    return {
      scrollY: 0,
      windowScrollX: 0,
    };
  },
  computed: {
    isShow() {
      return this.config
        .reduce(
          (arr, cur) => [...arr, ...cur.products.map((item) => item.path)],
          []
        )
        .includes(this.$parent.getPath());
    },

    product() {
      return this.config.filter(({ products }) =>
        products.map(({ path }) => path).includes(this.$parent.getPath())
      )[0];
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.headerHeight =
      (document.querySelector(".header-wrapper .header-warning")
        ?.offsetHeight ?? 0) + 70;
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
  &.rqoptimizer,
  &.quant {
    min-width: 1024px;
  }
  .header__bg {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rqthemify(--background-white);
    box-shadow: 0px 10px 11px 0px rqthemify(--shadow-primary);
  }

  $products: rqdata, rqams, rqoptimizer, quant;
  @each $product in $products {
    &.#{$product} {
      .icon-base {
        color: rqthemify(--#{$product}-product-color);
      }
      .nav__product {
        &.is-active {
          color: rqthemify(--#{$product}-product-color);
          &:after {
            background: rqthemify(--#{$product}-product-color);
            width: 100%;
          }
        }
      }

      .nav__button {
        color: rqthemify(--#{$product}-product-color);
        border-color: rqthemify(--#{$product}-product-color);
        &:hover {
          background-color: rqthemify(--#{$product}-product-color-9);
        }
        &:active,
        &:focus {
          background-color: rqthemify(--#{$product}-product-color);
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
      margin-right: 16px;
      display: flex;
      align-items: center;
      &:hover,
      &:focus,
      &:active {
        transform: scaleX(1.05);
      }
      .icon-base {
        font-size: 28px;
      }

      .main-label {
        @include h3(rqthemify(--text-primary));
        margin: 0 8px 0 10px;
      }

      .second-label {
        @include rg-text(rqthemify(--text-primary));
      }
    }

    .nav__product {
      position: relative;
      cursor: pointer;
      @include rg-text(rqthemify(--text-normal));
      margin: 0 16px;
      padding: 18px 0;
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
          background: rqthemify(--background-hover);
          width: 100%;
        }
      }
    }

    .nav__button {
      padding: 12px 28px;
      line-height: 1;
      border-radius: 8px;
      &:hover,
      &:active,
      &:focus {
        color: rqthemify(--text-white);
      }
    }
  }
}
</style>
