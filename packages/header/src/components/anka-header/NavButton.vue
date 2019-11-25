<template>
  <div class="nav-button__wrapper" @mouseover="hoverHandler">
    <el-button
      type="text"
      :class="['nav-button', { active, light }]"
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
    light: {
      type: Boolean,
      default: false
    },
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
  @include text;
  &:hover {
    color: rqthemify(highlight);
    background: rqthemify(button-gray);
  }
  &:focus {
    color: rqthemify(text);
  }
  &.active {
    color: rqthemify(highlight);
  }
  &.light {
    color: rqthemify(text-white-dark);
    &:hover {
      color: rqthemify(text);
    }
    &.active {
      color: rqthemify(text-white);
      span {
	padding-bottom: 12px;
	border-bottom: 1px solid rqthemify(text-white);
      }
      &:hover {
	color: rqthemify(highlight);
      }
    }
  }
}

.nav-button {
  position: relative;
  padding: 4px 14px;
  margin: 0;
  &__wrapper {
    display: inline-block;
  }
}
</style>
