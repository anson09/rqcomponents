<template>
  <div v-if="show" class="theme-switch">
    <el-tooltip
      v-model="active"
      placement="bottom-end"
      popper-class="theme-switch-toast"
      transition="rq-zoom-in-top"
      :effect="value"
    >
      <div slot="content">
        <div
          v-for="mode in modeConfig"
          :key="mode.label"
          :class="['theme-switch-toast__side', { 'is-active': mode.active }]"
          @click="themeChange(mode.value)"
        >
          <div class="theme-switch-toast__pic">
            <i class="rq-icons rq-icon-theme-choose"></i>
            <img :src="mode.img" alt="" />
          </div>
          <p>{{ mode.label }}</p>
        </div>
      </div>
      <el-button class="theme-switch-button" size="mini" type="text">
        <i v-show="active" class="rq-icons rq-icon-theme-fills"></i>
        <i v-show="!active" class="rq-icons rq-icon-theme-border"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import elButton from "element-ui/lib/button";
import elTooltip from "element-ui/lib/tooltip";
import lightImg from "../../../assets/img/theme-light.png";
import darkImg from "../../../assets/img/theme-dark.png";
import { THEME_MODE, themeRender, isSupported } from "../../../util";

export default {
  name: "ThemeSwitch",
  components: {
    elButton,
    elTooltip
  },
  data() {
    return {
      value: "light",
      active: false,
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
    color: rqthemify(text);
    background-color: inherit;
    border: none;
    .rq-icons {
      &.rq-icon-theme-fills {
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
}
</style>
<style lang="scss">
.theme-switch {
  &-toast {
    &.el-tooltip__popper {
      top: 38px !important;
      margin: 0;
      padding: 32px 14px;
      padding-top: 16px;
      color: rqthemify(text);
      background: rqthemify(active-background-color);
      font-family: sans-serif;
      border-radius: 0 0 2px 2px;
      border: none;
      .popper__arrow {
        display: none;
      }
    }
    &__side {
      position: relative;
      font-size: 14px;
      color: rqthemify(text);
      text-align: center;
      cursor: pointer;
      &.is-active {
        color: rqthemify(hover-color);
        .theme-switch-toast__pic .rq-icons {
          opacity: 1;
        }
      }
      + & {
        margin-top: 20px;
      }
    }
    &__pic {
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
  &-button {
    height: 40px;
  }
}
</style>
