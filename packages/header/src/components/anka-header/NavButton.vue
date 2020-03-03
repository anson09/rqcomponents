<template>
  <el-popover
    class="nav-button__wrapper"
    placement="bottom-start"
    trigger="hover"
    popper-class="nav-menu"
    v-model="active"
    :visible-arrow="false"
    v-if="links.length > 0"
  >
    <div>
      <dropdown-menu
        :links="links"
        :support="support"
        @redirect="redirect"
      ></dropdown-menu>
    </div>
    <el-button
      type="text"
      :class="['nav-button', { active, light }]"
      @click="clickHandler"
      slot="reference"
    >
      <span>{{ label }}</span>
      <i
        v-if="more"
        :class="`el-icon-arrow-${active ? 'up' : 'down'} el-icon--right`"
      />
    </el-button>
  </el-popover>

  <el-button
    v-else
    type="text"
    :class="['nav-button', { light }]"
    @click="clickHandler"
    slot="reference"
  >
    <span>{{ label }}</span>
    <i
      v-if="more"
      :class="`el-icon-arrow-${active ? 'up' : 'down'} el-icon--right`"
    />
  </el-button>
</template>

<script>
import elPopover from "element-ui/lib/popover";
import elButton from "element-ui/lib/button";
import DropdownMenu from "./DropdownMenu.vue";

export default {
  name: "NavButton",
  components: {
    elPopover,
    elButton,
    DropdownMenu
  },
  props: {
    light: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    links: {
      default: () => [],
      type: Array
    },
    support: {
      required: true,
      type: Object
    },
    more: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    clickHandler() {
      this.$emit("click", this.label);
    },
    redirect(...args) {
      this.$emit("redirect", ...args);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../common/style/common";

.nav-button {
  position: relative;
  @include text;
  position: relative;
  padding: 4px 14px;
  height: 100%;
  margin: 0;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    transition: background 0.3s;
  }
  &__wrapper {
    position: relative;
    display: block;
    height: 100%;
  }
  &:focus {
    color: rqthemify(text);
  }
  &.active {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  }
  &:hover,
  &.active {
    color: rqthemify(highlight);
    background: white;
    &::after {
      background: rqthemify(hover-color);
    }
  }
  &.light {
    border-width: 0;
    color: rqthemify(text-white-dark);
    &:hover {
      color: rqthemify(highlight);
      background: white;
    }
    &.active {
      background: white;
      color: rqthemify(highlight);
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
</style>
