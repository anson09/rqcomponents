<template>
  <div v-clickoutside="handleClickOutside" class="document">
    <div class="document-icon-wrapper" @click="toggleDropdownVisible">
      <i class="el-icon-question"></i>
    </div>
    <DocDropdownMenu v-show="dropdownVisible" :config="links" />
  </div>
</template>
<script>
import DocDropdownMenu from "../common/DocDropdownMenu.vue";
import dropdownMixin from "./dropdown-mixin";

export default {
  name: "Document",
  components: { DocDropdownMenu },
  mixins: [dropdownMixin],
  inheritAttrs: false,
  props: {
    links: { type: Array, required: true },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.document {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  &-icon-wrapper {
    @include logged-icon-container("el-icon-question");
  }
  ::v-deep {
    .doc-menu {
      right: 0;
      position: absolute;
      bottom: 4px;
      transform: translateY(100%);
      &-item-popover {
        left: 0;
        transform: translateX(-100%);
      }
    }
  }
}
</style>
