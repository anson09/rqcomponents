<template>
  <div v-if="visible" class="rq-notification">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      {{ text }}
    </template>
    <i class="rq-icon el-icon-circle-close" @click="handleClose"></i>
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: {
    text: { type: String, default: "" },
  },
  data() {
    return {
      isHidden: false,
    };
  },
  computed: {
    visible() {
      return !this.isHidden && (!!this.text || !!this.$slots.default);
    },
  },
  methods: {
    handleClose() {
      this.isHidden = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.rq-notification {
  margin: 0;
  position: relative;
  padding-right: 24px;
  color: rqthemify(--warning-color);
  background: rqthemify(--warning-background);
  font-size: 16px;
  line-height: 24px;
  display: flex;

  ::-webkit-scrollbar {
    height: 4px;
  }

  @media screen and(max-width: 1280px) {
    font-size: 12px;
  }
  .el-icon-circle-close {
    cursor: pointer;
    padding: 4px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    top: 0;
    background: rqthemify(--warning-background-secondary);
  }
}
</style>
