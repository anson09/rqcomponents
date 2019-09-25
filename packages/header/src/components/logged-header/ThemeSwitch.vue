<template>
<div class="theme-switch" v-if="show">
    <el-tooltip
      v-model="active"
      placement="bottom"
      popper-class="theme-switch-toast"
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
            <img :src="mode.img" alt="">
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
import lightImg from "../../../assets/img/theme-light.png";
import darkImg from "../../../assets/img/theme-dark.png";
import { THEME_MODE, themeRender, isSupported } from "../../../util"
import elButton from "element-ui/lib/button";
import elTooltip from "element-ui/lib/tooltip";

export default {
  name: "ThemeSwitch",
  components: {
    elButton,
    elTooltip
  },
  data () {
    return {
      value: "light",
      active: false,
      show: false
    }
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
      if (["/ams"].some(e => url.includes(e))) {
	this.show = true;
	const theme = localStorage.theme;
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
}
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.theme-switch {
  margin: auto;
  &-button {
    padding: 0 10px;
    color: var(--text-color);
    background-color: inherit;
    border: none;
    .rq-icons {
      font-size: 20px;
      &.rq-icon-theme-fills {
        color: var(--hover-color);
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

.el-tooltip__popper.theme-switch-toast {
  color: var(--text-color);
  background: var(--background-color);
  border: 1px solid var(--border-hover-color);
  --arrow-color: var(--border-hover-color);
  font-family: sans-serif;
  .popper__arrow {
    display: none;
  }
  .theme-switch-toast__side {
    position: relative;
    float: left;
    font-size: 14px;
    color: var(--text-color);
    text-align: center;
    cursor: pointer;
    &.is-active {
      color: var(--hover-color);
      .theme-switch-toast__pic .rq-icons {
        opacity: 1;
      }
    }
    .theme-switch-toast__pic {
      position: relative;
      & .rq-icons {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        font-size: inherit;
        line-height: 100%;
        color: var(--color-success);
        text-align: center;
        opacity: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
