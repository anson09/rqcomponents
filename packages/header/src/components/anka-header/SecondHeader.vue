<template>
  <div
    v-if="isShow"
    :class="`second-header ${icon}`"
    :style="{ transform: `translate(-${windowScrollX}px, ${scrollY}px)` }"
  >
    <div class="header__bg"></div>
    <nav>
      <div class="nav__icon">
	<i :class="`rq-icons icon-${icon}`"></i>
        <span class="mainTitle">{{ mainTitle }}</span>
        <span class="secondTitle">{{ secondTitle }}</span>
      </div>
      <div class="nav__buttons">
        <CommonButton
          class="nav__button"
          :plain="true"
          label="免费试用"
          @click="$router.push(redirect)"
        ></CommonButton>
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
    secondTitle: "金融数据",
    product: "rqdata"
  },
  "/rqpro": {
    icon: "rqpro",
    mainTitle: "RQPro",
    secondTitle: "量化投研终端",
    product: "rqpro"
  },
  "/ams": {
    icon: "rqams",
    mainTitle: "RQAMS",
    secondTitle: "米筐资产管理系统",
    product: "rqams"
  },
  "/rqoptimizer": {
    icon: "rqoptimizer",
    mainTitle: "RQOptimizer",
    secondTitle: "米筐股票优化器",
    product: "rqoptimizer"
  }   
};

export default {
  name: "SecondHeader",
  components: { CommonButton },
  props: {},
  data() {
    return {
      usePageLink: Object.keys(path2config), // 产品的几个页面在路由页中的path
      scrollFn: null,
      windowScrollX: 0,
      windowScrollY: 0
    };
  },
  computed: {
    isShow() {
      return this.usePageLink.includes(this.$parent.getPath());
    },
    config() {
      return path2config[this.$parent.getPath()];
    },
    icon() {
      return this.findInConfig("icon");
    },
    mainTitle() {
      return this.findInConfig("mainTitle");
    },
    secondTitle() {
      return this.findInConfig("secondTitle");
    },
    redirect() {
      return `/pricing#${this.findInConfig("product")}`;
    },
    scrollY() {
      return this.windowScrollY <= 70 ? 70 - this.windowScrollY : 0;
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.scrollFn = window.addEventListener(
      "scroll",
      () => {
	this.windowScrollY = window.scrollY;
	this.windowScrollX = window.scrollX;
      }
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollFn);
  },
  methods: {
    findInConfig(key) {
      if (this.config) {
        return this.config[key];
      }
      return "";
    }
  }
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
  
  
  $products: rqdata, rqpro, rqams, rqoptimizer;
  @each $product in $products {
    &.#{$product} {
      color: rqthemify($product);
      .nav__button {
	color: rqthemify($product);
	border-color: rqthemify($product);
      }
    }
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 50px;
    height: 100%;

    .nav__icon {
      display: flex;
      align-items: center;

      .rq-icons {
	font-size: 36px;
        margin-right: 13px;
      }

      &__title {
        width: 30px;
      }

      .mainTitle {
        @include h3(rqthemify(text-dark));
      }

      .secondTitle {
        @include rg-text(rqthemify(text-dark));
        margin-left: 13px;
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
