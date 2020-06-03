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
  @include text(rqthemify(--text-primary));
  border: 1px solid transparent;
  border-radius: 4px;
  @include click-scale();
  &.disabled {
    color: rqthemify(--text-secondary);
    cursor: not-allowed;
    background: rqthemify(--background-primary);
    border-color: rqthemify(--primary-color-1);
    &:active {
      transform: none;
    }
  }

  & + & {
    margin-left: 26px;
  }
  &:hover,
  &:active {
    color: rqthemify(--text-white);
  }

  &:focus {
    color: rqthemify(--text-white);
  }
  &.plain {
    color: rqthemify(--primary-color);
    background: transparent;
    border: 1px solid rqthemify(--primary-color);

    &.light {
      color: rqthemify(--border-primary);
      border-color: rqthemify(--border-primary);
      &:hover {
        background: rqthemify(--primary-color-8);
      }
    }

    &.disabled {
      color: rqthemify(--text-secondary);
      cursor: not-allowed;
      background: rqthemify(--background-primary);
      border-color: rqthemify(--primary-color-1);
      &:active {
        transform: none;
      }
    }
    &:focus,
    &:active {
      color: rqthemify(--primary-color);
      background: rqthemify(--primary-color-1);
    }
    &:hover {
      color: rqthemify(--primary-color);
      background: rqthemify(--primary-color-1);
    }
  }
}
</style>
