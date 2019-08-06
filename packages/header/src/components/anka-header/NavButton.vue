<template>
  <div class="nav-button__wrapper" @mouseover="hoverHandler">
    <el-button
      type="text"
      :class="['nav-button', { active }]"
      @click="clickHandler"
    >
      <span>{{ label }}</span>
      <i
        v-if="more"
        :class="`el-icon-arrow-${active ? 'up' : 'down'} el-icon--right`"
      />
    </el-button>
  </div>
</template>

<script>
import elButton from "element-ui/lib/button";

export default {
  name: "NavButton",
  props: {
    label: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  components: {
    elButton
  },
  methods: {
    clickHandler() {
      this.$emit("click", this.label);
    },
    hoverHandler() {
      this.$emit("hover", this.label);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.nav-button {
  position: relative;
  padding: 4px 14px;
  margin: 0;
  @include text;
  &__wrapper {
    display: inline-block;
  }
  &:hover {
    background: $button-gray;
  }
  &.active {
    color: $highlight;
  }
}
</style>
