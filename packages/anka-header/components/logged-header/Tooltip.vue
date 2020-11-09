<template>
  <div :class="['tooltip', mode]">
    <div class="tooltip__text">{{ text }}</div>
    <div class="tooltip__arrow"></div>
  </div>
</template>
<script>
export default {
  name: "Tooltip",
  props: {
    text: { type: String, default: "" },
    mode: { type: String, default: "dark" },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 4px);
  box-shadow: 0px 2px 4px rqthemify(--primary-color-1);
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
    box-shadow: 0px 2px 4px rqthemify(--primary-color-1);
  }
  &__arrow {
    left: 50%;
    content: "";
    display: block;
    top: 5px;
    box-shadow: 0px 2px 4px rqthemify(--primary-color-1);
    transform: translate(-50%, -100%) rotate(-135deg);
    position: absolute;
    border-top: 4px solid rqthemify(--background-final);
    border-left: 4px solid rqthemify(--background-final);
    transform-origin: center center;
  }

  &.light {
    .tooltip {
      &__text {
        border: 1px solid rqthemify(--border-tooltip);
        color: rqthemify(--text-tooltip);
        background: rqthemify(--background-final);
      }
      &__arrow {
        z-index: 9;
        border-right: 4px solid rqthemify(--border-tooltip);
        border-bottom: 4px solid rqthemify(--border-tooltip);
        &:after {
          position: absolute;
          content: "";
          border: 4px solid rqthemify(--background-final);
          display: block;
          left: -5px;
          top: -5px;
        }
      }
    }
  }
  &.dark {
    .tooltip {
      &__text {
        color: rqthemify(--text-white);
        background: rqthemify(--background-dark);
      }
      &__arrow {
        border-right: 4px solid rqthemify(--background-dark);
        border-bottom: 4px solid rqthemify(--background-dark);
      }
    }
  }
}
</style>
