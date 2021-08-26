<template>
  <div v-clickoutside="handleClickOutside" class="rq-header-theme">
    <div
      :class="[
        'rq-header-theme__button',
        { 'is-icon-active': dropdownVisible },
      ]"
      @click="toggleDropdownVisible"
    >
      <i
        class="icon-base icon-base-theme icon-base-theme-fills active-icon"
      ></i>
      <i class="icon-base icon-base-theme icon-base-theme-border"></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="rq-header-theme__dropdown">
        <div
          v-for="mode in modeConfig"
          :key="mode.label"
          :class="[
            'rq-header-theme__dropdown--choice',
            { 'is-active': mode.active },
          ]"
          @click="themeChange(mode.value)"
        >
          <div class="rq-header-theme__dropdown--pic">
            <i class="icon-base icon-base-success"></i>
            <img :src="mode.img" alt="" />
          </div>
          <p>{{ mode.label }}</p>
          <Tooltip
            v-if="mode.tooltipText"
            :text="mode.tooltipText"
            :class="{ 'is-ie': !isBrowerSupported }"
            mode="weak"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import lightImg from "../assets/img/theme-light.png";
import darkImg from "../assets/img/theme-dark.png";
import Tooltip from "./Tooltip.vue";

import {
  getStorage,
  setStorage,
  isCssVarSupported,
} from "../../common/util/index";
import dropdownMixin from "./dropdown-mixin";

const THEME_MODE = ["dark", "light"];

export default {
  name: "ThemeSwitch",
  components: { Tooltip },
  mixins: [dropdownMixin],
  inheritAttrs: false,
  data() {
    return {
      value: "light",
      isBrowerSupported: true,
      isProductSupported: true,
      productsSupported: ["/ams", "/quant", "/rqcomponents"],
    };
  },
  computed: {
    modeConfig() {
      return [
        {
          label: "极致简洁",
          img: lightImg,
          value: "light",
          active: this.value === "light",
          tooltipText: null,
        },
        {
          label: "沉浸体验",
          img: darkImg,
          value: "dark",
          active: this.value === "dark",
          tooltipText: !this.isBrowerSupported
            ? "IE浏览器不支持深肤色"
            : !this.isProductSupported
            ? "该产品暂无深肤色"
            : "",
        },
      ];
    },
  },
  mounted() {
    this.isBrowerSupported = isCssVarSupported();
    this.isProductSupported = !!this.productsSupported.find((item) =>
      window.location.pathname.startsWith(item)
    );

    if (this.isBrowerSupported && this.isProductSupported) {
      const theme = getStorage("theme");
      this.value = THEME_MODE.includes(theme) ? theme : "light";
      this.themeRender(this.value);
    }
  },
  methods: {
    themeRender(theme = "light") {
      if (!THEME_MODE.includes(theme)) return;
      const bodyClassList = document.body.classList;
      bodyClassList.add(`theme-${theme}`);
      bodyClassList.forEach((i) => {
        if (i.includes("theme") && !i.includes(theme)) {
          bodyClassList.remove(i);
        }
      });
    },
    themeChange(theme) {
      if (!this.isBrowerSupported || !this.isProductSupported) return;
      if (!THEME_MODE.includes(theme)) return;
      this.themeRender(theme);
      this.value = theme;
      this.$emit("switch-theme", theme);
      setStorage("theme", theme);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../style/mixins.scss";
@include block(theme) {
  color: var(--text-normal);
  margin: 0 8px;
  position: relative;
  height: 100%;
  @include f-center;

  &__button {
    width: 30px;
    height: 30px;
    @include icon-container("icon-base-theme", 18);
  }
  &__dropdown {
    @include dropdown;
    padding: 16px 14px;
    padding-top: 16px;
    color: var(--text-normal);
    width: 110px;
    border: none;
    cursor: default;
    left: 0;

    &--pic {
      display: block;
      position: relative;
      width: 57px;
      margin: 0 auto;
      img {
        width: 100%;
      }
      .icon-base-success {
        position: absolute;
        @include t-center-vertical;
        right: 0;
        left: 0;
        font-size: 16px;
        line-height: 100%;
        color: var(--green);
        text-align: center;
        opacity: 0;
      }
    }
    &--choice {
      position: relative;
      font-size: 14px;
      margin: 14px 0;
      color: var(--text-normal);
      text-align: center;
      cursor: pointer;
      &.is-active {
        color: var(--primary-color);
        .icon-base-success {
          opacity: 1;
        }
      }
      + & {
        margin-top: 20px;
      }
      @include tooltip-wrapper;
      ::v-deep {
        @include block(tooltip) {
          left: -22px;
          &.is-ie {
            left: -36px;
          }
          transform: translate(0, -102px);
          &__arrow {
            top: 30px;
            transform: translate(-50%, -100%) rotate(45deg);
          }
          &__text {
            padding-left: 20px;
            padding-right: 20px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
