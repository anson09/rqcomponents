<template>
  <div :class="['rq-header-tooltip', mode]">
    <div class="rq-header-tooltip__text">{{ text }}</div>
    <div class="rq-header-tooltip__arrow"></div>
  </div>
</template>
<script>
export default {
  name: "Tooltip",
  props: {
    text: { type: String, default: "" },
    mode: { type: String, default: "weak" },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "../style/mixins.scss";
@include block(tooltip) {
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 100%;
  @include t-center-horizontal(6px);
  box-shadow: 0px 2px 4px var(--primary-color-1);
  border: none;
  &__text {
    border-radius: 2px;
    box-sizing: border-box;
    line-height: 18px;
    padding: 4px 8px;
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    position: relative;
    z-index: 9;
    box-shadow: 0px 2px 4px var(--primary-color-1);
  }
  &__arrow {
    left: 50%;
    content: "";
    display: block;
    top: 5px;
    box-shadow: 0px 2px 4px var(--primary-color-1);
    transform: translate(-50%, -100%) rotate(-135deg);
    position: absolute;
    border-top: 4px solid var(--bg-primary);
    border-left: 4px solid var(--bg-primary);
    transform-origin: center center;
  }

  &.strong {
    @include block(tooltip) {
      &__text {
        border: 1px solid var(--tooltip-border);
        color: var(--text-title);
        background: var(--bg-primary);
      }
      &__arrow {
        z-index: 9;
        border-right: 4px solid var(--tooltip-border);
        border-bottom: 4px solid var(--tooltip-border);
        &:after {
          position: absolute;
          content: "";
          border: 4px solid var(--bg-primary);
          display: block;
          left: -5px;
          top: -5px;
        }
      }
    }
  }
  &.weak {
    @include block(tooltip) {
      &__text {
        color: var(--border-secondary);
        background: var(--tooltip-weak-bg);
      }
      &__arrow {
        border-right: 4px solid var(--tooltip-weak-bg);
        border-bottom: 4px solid var(--tooltip-weak-bg);
      }
    }
  }
}
</style>
