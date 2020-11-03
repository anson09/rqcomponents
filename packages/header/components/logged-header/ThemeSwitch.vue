<template>
  <div v-clickoutside="handleClickOutside" class="theme-switch">
    <div
      :class="['theme-switch-button', { 'is-icon-active': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <i
        class="icon-base icon-base-theme icon-base-theme-fills active-icon"
      ></i>
      <i class="icon-base icon-base-theme icon-base-theme-border"></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="dropdownVisible" class="theme-switch__dropdown">
        <div
          v-for="mode in modeConfig"
          :key="mode.label"
          :class="[
            'theme-switch__dropdown--choice',
            { 'is-active': mode.active },
          ]"
          @click="themeChange(mode.value)"
        >
          <div class="theme-switch__dropdown--pic">
            <i class="el-icon-success"></i>
            <img :src="mode.img" alt="" />
          </div>
          <p>{{ mode.label }}</p>
          <Tooltip
            v-if="mode.tooltipText"
            :text="mode.tooltipText"
            :class="{ 'is-ie': !isBrowerSupported }"
            mode="dark"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import lightImg from "../../assets/img/theme-light.png";
import darkImg from "../../assets/img/theme-dark.png";
import Tooltip from "./Tooltip.vue";

import {
  THEME_MODE,
  themeRender,
  isSupported,
  isProductPath,
} from "../../util";
import { getStorage, setStorage } from "../../../common/util";
import mixin from "../../../common/util/mixin";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "ThemeSwitch",
  components: { Tooltip },
  mixins: [mixin, dropdownMixin],
  inheritAttrs: false,
  data() {
    return {
      value: "light",
      isBrowerSupported: true,
      isProductSupported: true,
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
    this.isBrowerSupported = isSupported();
    this.isProductSupported = isProductPath(this.getPath());

    if (this.isBrowerSupported && this.isProductSupported) {
      const theme = getStorage("theme", "string");
      this.value = THEME_MODE.includes(theme) ? theme : "light";
      themeRender(this.value);
    }
  },
  methods: {
    themeChange(theme) {
      if (!this.isBrowerSupported || !this.isProductSupported) return;
      if (!THEME_MODE.includes(theme)) return;
      setStorage("theme", theme);
      themeRender(theme);
      this.value = theme;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/mixins";

.theme-switch {
  color: rqthemify(--text-normal);
  margin: 0 8px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  &-button {
    width: 30px;
    height: 30px;
    @include logged-icon-container("icon-base-theme", 18);
  }
  &__dropdown {
    @include logged-dropdown;
    padding: 16px 14px;
    padding-top: 16px;
    color: rqthemify(--text-normal);
    width: 110px;
    box-sizing: border-box;
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
      .el-icon-success {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        font-size: 16px;
        line-height: 100%;
        color: rqthemify(--succeed-color);
        text-align: center;
        opacity: 0;
        transform: translateY(-50%);
      }
    }
    &--choice {
      position: relative;
      font-size: 14px;
      margin: 14px 0;
      color: rqthemify(--text-normal);
      text-align: center;
      cursor: pointer;
      &.is-active {
        color: rqthemify(--primary-color);
        .theme-switch__dropdown--pic .el-icon-success {
          opacity: 1;
        }
      }
      + & {
        margin-top: 20px;
      }
      @include tooltip-wrapper;
      .tooltip {
        left: -22px;
        &.is-ie {
          left: -36px;
        }
        transform: translate(0, -102px);
        ::v-deep {
          .tooltip__arrow {
            top: 30px;
            transform: translate(-50%, -100%) rotate(45deg);
          }
          .tooltip__text {
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
