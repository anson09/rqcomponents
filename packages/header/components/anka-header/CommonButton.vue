<template>
  <el-button
    :class="['common-button', { plain, disabled, light }]"
    @click="clickHandler"
  >
    <span class="label">{{ label }}</span>
  </el-button>
</template>
<script>
import ElButton from "element-ui/lib/button";

export default {
  name: "CommonButton",
  components: {
    ElButton,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickHandler() {
      this.$emit("click", this.label);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/mixins";

.common-button {
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 28px;
  @include text(rqthemify(text-white));
  background: linear-gradient(
    180deg,
    rgba(58, 152, 228, 1) 0%,
    rgba(27, 95, 196, 1) 100%
  );
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.2s;

  &.disabled {
    color: rqthemify(text-disabled);
    cursor: not-allowed;
    background: rqthemify(button-disabled);
    border-color: rqthemify(border-disabled);
    &:active {
      transform: none;
    }
  }

  & + & {
    margin-left: 26px;
  }
  &:hover,
  &:active {
    color: rqthemify(text-white);
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
    color: rqthemify(text-white);
    background: linear-gradient(
      180deg,
      rgba(58, 152, 228, 1) 0%,
      rgba(27, 95, 196, 1) 100%
    );
  }
  &.plain {
    color: rqthemify(highlight);
    background: transparent;
    border: 1px solid rqthemify(highlight);

    &.light {
      color: rqthemify(text-white-dark);
      border-color: rqthemify(text-white-dark);
      &:hover {
        background: rqthemify(button-gray, 0.8);
      }
    }

    &.disabled {
      color: rqthemify(text-disabled);
      cursor: not-allowed;
      background: rqthemify(button-disabled);
      border-color: rqthemify(border-disabled);
      &:active {
        transform: none;
      }
    }
    &:focus,
    &:active {
      color: rqthemify(highlight);
      background: rqthemify(button-gray);
    }
    &:hover {
      color: rqthemify(highlight);
      background: rqthemify(button-gray);
    }
  }
}
</style>
