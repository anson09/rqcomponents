<template>
  <el-popover
    v-if="links.length > 0"
    v-model="active"
    class="nav-button__wrapper"
    placement="bottom-start"
    trigger="hover"
    popper-class="nav-menu"
    :visible-arrow="false"
  >
    <div>
      <dropdown-menu
        :links="links"
        :support="support"
        @redirect="redirect"
      ></dropdown-menu>
    </div>
    <el-button
      slot="reference"
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
  </el-popover>

  <el-button
    v-else
    slot="reference"
    type="text"
    :class="['nav-button', { light }]"
    @click="clickHandler"
  >
    <span>{{ label }}</span>
    <i
      v-if="more"
      :class="`el-icon-arrow-${active ? 'up' : 'down'} el-icon--right`"
    />
  </el-button>
</template>

<script>
import ElPopover from "element-ui/lib/popover";
import ElButton from "element-ui/lib/button";
import DropdownMenu from "./DropdownMenu.vue";

export default {
  name: "NavButton",
  components: {
    ElPopover,
    ElButton,
    DropdownMenu,
  },
  props: {
    light: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    links: {
      default: () => [],
      type: Array,
    },
    support: {
      required: true,
      type: Object,
    },
    more: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    clickHandler() {
      this.$emit("click", this.label);
    },
    redirect(...args) {
      this.$emit("redirect", ...args);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/mixins";

.nav-button {
  position: relative;
  @include text(rqthemify(--text-primary));
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
    color: rqthemify(--text-normal);
  }
  &.active {
    box-shadow: 0px 0px 20px 0px rqthemify(--shadow-primary);
  }
  &:hover,
  &.active {
    color: rqthemify(--primary-color);
    background: rqthemify(--background-white);
    &::after {
      background: rqthemify(--primary-color);
    }
  }
  &:hover:not(.active) {
    box-shadow: 0px 0px 8px 0px rqthemify(--shadow-primary);
  }
  &.light {
    border-width: 0;
    color: rqthemify(--border-primary);
    &:hover,
    &:active {
      color: rqthemify(--primary-color);
      background: rqthemify(--background-white);
    }
    &.active {
      background: rqthemify(--background-white);
      color: rqthemify(--primary-color);
      span {
        padding-bottom: 12px;
        // border-bottom: 1px solid rqthemify(--text-primary);
      }
      &:hover {
        color: rqthemify(--primary-color);
      }
    }
  }
}
</style>
