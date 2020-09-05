<template>
  <button
    :class="['nav-button', { light, 'has-dropdown': button.links }]"
    @click="redirect(button.link)"
  >
    <span>{{ button.label }}</span>
    <template v-if="button.links">
      <i class="el-icon-arrow-up" />
      <div class="nav-button__dropdown-wrapper">
        <dropdown-menu
          class="nav-button__dropdown"
          :links="button.links"
          :support="support"
          @redirect="redirect"
        ></dropdown-menu>
      </div>
    </template>
  </button>
</template>

<script>
import DropdownMenu from "../common/DropdownMenu.vue";

export default {
  name: "NavButton",
  components: {
    DropdownMenu,
  },
  props: {
    light: {
      type: Boolean,
      default: false,
    },
    support: {
      required: true,
      type: Object,
    },
    button: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    redirect(link) {
      this.$emit("redirect", link);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../common/style/mixins";

.nav-button {
  &:active {
    transform: none;
  }
  position: relative;
  text-align: left;
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

  &:focus {
    color: rqthemify(--text-normal);
  }

  &:hover {
    color: rqthemify(--primary-color);
    background: rqthemify(--background-white);
    box-shadow: 0px 0px 8px 0px rqthemify(--shadow-primary);
    &::after {
      background: rqthemify(--primary-color);
    }
  }
  &.has-dropdown:hover {
    box-shadow: 0px 0px 20px 0px rqthemify(--shadow-secondary);
  }

  &.light {
    border-width: 0;
    color: rqthemify(--border-primary);
    &:hover,
    &:active {
      color: rqthemify(--primary-color);
      background: rqthemify(--background-white);
    }
  }

  .el-icon-arrow-up {
    margin-left: 4px;
  }

  &__dropdown {
    display: none;
    max-height: 80vh;
    overflow-y: auto;
    &-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
    }
  }
  &:hover &__dropdown {
    display: block;
  }
  &:hover .el-icon-arrow-up {
    transform: rotate(180deg);
  }
}
</style>
