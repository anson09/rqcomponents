<template>
  <div v-if="show" v-clickoutside="handleClickOutside" class="theme-switch">
    <div class="theme-switch-button" @click="toggleDropdownVisible">
      <i class="icon-base icon-base-theme-fills"></i>
      <i class="icon-base icon-base-theme-border"></i>
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
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import lightImg from "../../assets/img/theme-light.png";
import darkImg from "../../assets/img/theme-dark.png";

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
  mixins: [mixin, dropdownMixin],
  inheritAttrs: false,
  data() {
    return {
      value: "light",
      show: false,
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
        },
        {
          label: "沉浸体验",
          img: darkImg,
          value: "dark",
          active: this.value === "dark",
        },
      ];
    },
  },
  mounted() {
    if (isSupported()) {
      const url = this.getPath();
      if (isProductPath(url)) {
        this.show = true;
        const theme = getStorage("theme", "string");
        this.value = THEME_MODE.includes(theme) ? theme : "light";
        themeRender(this.value);
        return;
      }
    }
    this.show = false;
  },
  methods: {
    themeChange(theme) {
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
  margin: auto;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  .icon-base-theme {
    &-border {
      display: inline-block;
    }
    &-fills {
      display: none;
    }
  }
  &:hover {
    .icon-base-theme {
      &-border {
        display: none;
      }
      &-fills {
        display: inline-block;
      }
    }
  }
  &-button {
    @include logged-icon-container("icon-base-theme-fills");
    @include logged-icon-container("icon-base-theme-border");
  }
  &__dropdown {
    @include logged-dropdown;
    padding: 16px 14px;
    padding-top: 16px;
    color: rqthemify(--text-normal);
    width: fit-content;
    border: none;
    cursor: default;

    &--pic {
      display: block;
      position: relative;
      width: 57px;
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
    }
  }
}
</style>
