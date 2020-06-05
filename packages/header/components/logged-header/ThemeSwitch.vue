<template>
  <div v-if="show" class="theme-switch">
    <div class="theme-switch-button">
      <i v-show="active" class="icon-base icon-base-theme-fills"></i>
      <i v-show="!active" class="icon-base icon-base-theme-border"></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="active" class="theme-switch__dropdown">
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
            <i class="icon-base icon-base-theme-choose"></i>
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
  getStorage,
  setStorage,
  THEME_MODE,
  themeRender,
  isSupported,
  isProductPath,
} from "../../../common/util";

export default {
  name: "ThemeSwitch",
  props: {
    active: {
      default: false,
      type: Boolean,
    },
  },
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
    themeRender("light");
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
  &-button {
    padding: 0 10px;
    width: 40px;
    text-align: center;
    color: rqthemify(--text-primary);
    background-color: inherit;
    border: none;
    .icon-base {
      pointer-events: none;
      font-size: 18px;
      &.icon-base-theme-fills {
        font-size: 20px;
        color: rqthemify(--primary-color);
      }
    }
    &:active,
    &:focus,
    &:hover {
      color: rqthemify(--primary-color);
      background-color: inherit;
    }
  }
  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 32px 14px;
    padding-top: 16px;
    color: rqthemify(--text-normal);
    background: rqthemify(--dropdown-background);
    border-radius: 0 0 2px 2px;
    width: fit-content;
    border: none;
    box-shadow: 0px 8px 12px 0px rqthemify(--shadow-primary);
    cursor: default;

    &--pic {
      display: block;
      position: relative;
      .icon-base {
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
        .theme-switch__dropdown--pic .icon-base {
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
