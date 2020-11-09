<template>
  <div v-clickoutside="handleClickOutside" class="document">
    <div
      :class="['document-icon-wrapper', { 'is-icon-active': dropdownVisible }]"
      @click="toggleDropdownVisible"
    >
      <i class="icon-base icon-base-help-border"></i>
      <i class="icon-base icon-base-help-fill active-icon"></i>
    </div>
    <DocDropdownMenu
      v-show="dropdownVisible"
      class="dropdown"
      :config="links"
    />
  </div>
</template>
<script>
import DocDropdownMenu from "../common/DocDropdownMenu.vue";
import dropdownMixin from "./dropdown-mixin";
import { docLinks as links } from "../../assets/dict/config";

export default {
  name: "Document",
  components: { DocDropdownMenu },
  mixins: [dropdownMixin],
  inheritAttrs: false,

  data() {
    return { links };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.document {
  margin: 0 8px;
  color: rqthemify(--text-normal);
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 30px;

  &-icon-wrapper {
    @include logged-icon-container("icon-base");
    height: 30px;
  }
  ::v-deep {
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
