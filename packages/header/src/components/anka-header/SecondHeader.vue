<template>
  <div
    v-if="isShow"
    class="second-header"
    :style="{ transform: `translateY(${70 - scrollY}px)` }"
  >
    <div class="header__bg"></div>
    <nav>
      <div class="nav__icon">
        <img :src="icon" alt class="nav__icon__logo" />
        <span class="mainTitle">{{ mainTitle }}</span>
        <span class="secondTitle">{{ secondTitle }}</span>
      </div>
      <div class="nav__buttons">
        <CommonButton
          class="nav__button"
          :plain="scrollY < 70"
          label="免费试用"
          @click="$router.push(redirect)"
        ></CommonButton>
      </div>
    </nav>
  </div>
</template>
<script>
import throttle from "lodash/throttle";
import CommonButton from "./CommonButton.vue";
import rdHuge from "../../../assets/img/rdHuge.png";
import rpHuge from "../../../assets/img/rpHuge.png";
import raHuge from "../../../assets/img/raHuge.png";

const path2config = {
  "/rqdata": {
    icon: rdHuge,
    mainTitle: "RQData",
    secondTitle: "金融数据",
    product: "rqdata"
  },
  "/rqpro": {
    icon: rpHuge,
    mainTitle: "RQPro",
    secondTitle: "量化投研终端",
    product: "rqpro"
  },
  "/ams": {
    icon: rpHuge,
    mainTitle: "RQAMS",
    secondTitle: "投资组合管理",
    product: "rqams"
  }
};

export default {
  name: "SecondHeader",
  components: { CommonButton },
  props: {},
  data() {
    return {
      usePageLink: ["/rqdata", "/rqpro", "/ams"], // 产品的几个页面在路由页中的path
      scrollFn: null,
      scrollY: 0
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
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.scrollFn = window.addEventListener(
      "scroll",
      throttle(() => {
        this.scrollY = window.scrollY <= 70 ? window.scrollY : 70;
      }, 100)
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
  z-index: -1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  height: 60px;
  @include full-vw;
  .header__bg {
    position: absolute;
    z-index: -2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $bg-white;
    box-shadow: 0px 10px 11px 0px rgba(8, 25, 52, 0.1);
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: $article-width;
    height: 100%;

    .nav__icon {
      display: flex;
      align-items: center;

      &__logo {
        width: 38px;
        height: 29px;
        margin-right: 13px;
      }

      &__title {
        width: 30px;
      }

      .mainTitle {
        @include h3($text-dark);
      }

      .secondTitle {
        @include rg-text($text-dark);
        margin-left: 13px;
      }
    }
    .nav__button {
      padding: 12px 28px;
      line-height: 1;
    }
  }
}
</style>
