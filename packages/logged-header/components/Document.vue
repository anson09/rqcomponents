<template>
  <div v-clickoutside="handleClickOutside" class="rq-header-doc">
    <div
      :class="[
        'rq-header-doc__icon-wrapper',
        { 'is-icon-active': dropdownVisible },
      ]"
      @click="toggleDropdownVisible"
    >
      <i class="icon-base icon-base-help-border"></i>
      <i class="icon-base icon-base-help-fill active-icon"></i>
    </div>
    <DocDropdownMenu v-show="dropdownVisible" />
  </div>
</template>
<script>
import dropdownMixin from "./dropdown-mixin";
import DocDropdownMenu from "../../common/components/DocDropdownMenu.vue";

export default {
  name: "Document",
  components: { DocDropdownMenu },
  mixins: [dropdownMixin],
  inheritAttrs: false,

  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "./../style/mixins.scss";
@include block(doc) {
  margin: 0 8px;
  color: rqthemify(--text-normal);
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 30px;

  &__icon-wrapper {
    @include icon-container("icon-base");
    height: 30px;
  }
  ::v-deep {
    // TODO
    .doc-menu {
      left: 0;
      position: absolute;
      bottom: -2px;
      transform: translateY(100%);
      &-item-popover {
        left: 0;
        transform: translateX(-100%);
      }
    }
  }
}
</style>
