<template>
  <el-button
    :class="['common-button', { plain, disabled, light }]"
    @click="clickHandler"
  >
    <span class="label">{{ label }}</span>
  </el-button>
</template>
<script>
import elButton from "element-ui/lib/button";

export default {
  name: "CommonButton",
  props: {
    label: {
      type: String,
      required: true
    },
    plain: {
      type: Boolean,
      default: false
    },
    light: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  components: {
    elButton
  },
  methods: {
    clickHandler() {
      this.$emit("click", this.label);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.common-button {
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 28px;
  @include text($text-white);
  background: linear-gradient(
    180deg,
    rgba(58, 152, 228, 1) 0%,
    rgba(27, 95, 196, 1) 100%
  );
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;

  &.disabled {
    color: $text-disabled;
    cursor: not-allowed;
    background: $button-disabled;
    border-color: $border-disabled;
    &:active {
      transform: none;
    }
  }

  & + & {
    margin-left: 26px;
  }
  &:hover,
  &:active {
    color: $text-white;
    background: linear-gradient(
      180deg,
      rgba(0, 133, 239, 1) 0%,
      rgba(0, 70, 173, 1) 100%
    );
  }
  &:active {
    transform: scale(1.1);
  }
  &:focus {
    color: $text-white;
    background: linear-gradient(
      180deg,
      rgba(58, 152, 228, 1) 0%,
      rgba(27, 95, 196, 1) 100%
    );
  }
  &.plain {
    color: $highlight;
    background: transparent;
    border: 1px solid $highlight;

    &.light {
      color: $text-white-dark;
      border-color: $text-white-dark;
      &:hover {
        background: rgba( $button-gray, .8 );
      }
    }

    &.disabled {
      color: $text-disabled;
      cursor: not-allowed;
      background: $button-disabled;
      border-color: $border-disabled;
      &:active {
        transform: none;
      }
    }
    &:focus,
    &:active {
      color: $highlight;
      background: $button-gray;
    }
    &:hover {
      color: $highlight;
      background: $button-gray;
    }
  }
}
</style>
