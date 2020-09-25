<template>
  <!-- TODO  v-if="show"-->
  <div class="theme-switch">
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

export default {
  name: "ThemeSwitch",
  inheritAttrs: false,
  data() {
    return {
      value: "light",
      show: false,
      dropdownVisible: false,
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
      const url = this.$parent.getPath();
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
    toggleDropdownVisible() {
      this.dropdownVisible = !this.dropdownVisible;
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
    position: absolute;
    bottom: 4px;
    transform: translateY(100%);
    right: 0;
    padding: 16px 14px;
    padding-top: 16px;
    color: rqthemify(--text-normal);
    background: rqthemify(--dropdown-background);
    width: fit-content;
    border: none;
    // TODO
    box-shadow: 0px 0px 8px hsla(220, 100%, 65%, 0.2);
    cursor: default;
    border-radius: 4px;

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
