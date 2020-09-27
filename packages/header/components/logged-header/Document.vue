<template>
  <div class="document">
    <div class="document-icon-wrapper" @click="toggleMenuVisile">
      <i class="el-icon-question"></i>
    </div>
    <DocDropdownMenu v-show="menuVisible" :config="links" />
  </div>
</template>
<script>
import DocDropdownMenu from "../common/DocDropdownMenu.vue";

export default {
  name: "Document",
  components: { DocDropdownMenu },
  inheritAttrs: false,
  props: {
    links: { type: Array, required: true },
  },
  data() {
    return {
      menuVisible: false,
    };
  },
  methods: {
    toggleMenuVisile() {
      this.menuVisible = !this.menuVisible;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../common/style/mixins.scss";
.document {
  display: flex;
  align-items: center;
  height: 100%;
  &-icon-wrapper {
    @include logged-icon-container("el-icon-question", 14, 5);
  }
  ::v-deep {
    .doc-menu {
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
