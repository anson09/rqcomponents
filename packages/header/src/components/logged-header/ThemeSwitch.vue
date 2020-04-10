<template>
  <div v-if="show" class="theme-switch">
    <div class="theme-switch-button">
      <i v-show="active" class="rq-icons rq-icon-theme-fills"></i>
      <i v-show="!active" class="rq-icons rq-icon-theme-border"></i>
    </div>
    <transition name="rq-zoom-in-top">
      <div v-show="active" class="theme-switch__dropdown">
        <div
          v-for="mode in modeConfig"
          :key="mode.label"
          :class="['theme-switch__dropdown--choice', { 'is-active': mode.active }]"
          @click="themeChange(mode.value)"
        >
          <div class="theme-switch__dropdown--pic">
            <i class="rq-icons rq-icon-theme-choose"></i>
            <img :src="mode.img" alt="" />
          </div>
          <p>{{ mode.label }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import lightImg from "../../../assets/img/theme-light.png";
import darkImg from "../../../assets/img/theme-dark.png";
import { THEME_MODE, themeRender, isSupported } from "../../../util";

export default {
  name: "ThemeSwitch",
  props: {
    active: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      value: "light",
      show: false
    };
  },
  computed: {
    modeConfig() {
      return [
        {
          label: "极致简洁",
          img: lightImg,
          value: "light",
          active: this.value === "light"
        },
        {
          label: "沉浸体验",
          img: darkImg,
          value: "dark",
          active: this.value === "dark"
        }
      ];
    }
  },
  mounted() {
    if (isSupported()) {
      const url = this.$parent.getPath();
      if (["/ams", "/quant"].some(e => url.includes(e))) {
        this.show = true;
        const { theme } = localStorage;
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
      localStorage.setItem("theme", theme);
      themeRender(theme);
      this.value = theme;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.theme-switch {
  margin: auto;
  &-button {
    padding: 0 10px;
    width: 36px;
    text-align: center;
    color: rqthemify(text);
    background-color: inherit;
    border: none;
    .rq-icons {
      pointer-events: none;
      &.icon-theme-fills {
        font-size: 14px;
        color: rqthemify(hover-color);
      }
    }
    &:active,
    &:focus,
    &:hover {
      background-color: inherit;
    }
  }
  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    padding: 32px 14px;
    padding-top: 16px;
    color: rqthemify(text);
    background: rqthemify(active-background-color);
    border-radius: 0 0 2px 2px;
    width: fit-content;
    border: none;
    box-shadow: 0px 8px 12px 0px rgba(152, 165, 185, 0.2);
    cursor: default;

    &--choice {
      position: relative;
      font-size: 14px;
      color: rqthemify(text);
      text-align: center;
      cursor: pointer;
      &.is-active {
        color: rqthemify(hover-color);
        .theme-switch__dropdown--pic .rq-icons {
          opacity: 1;
        }
      }
      + & {
        margin-top: 20px;
      }
    }
    &--pic {
      display: block;
      position: relative;
      .rq-icons {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        font-size: inherit;
        line-height: 100%;
        color: rqthemify(success);
        text-align: center;
        opacity: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
