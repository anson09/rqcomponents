<template>
  <div v-if="visible" class="rq-header-notification">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      {{ text }}
    </template>
    <i class="icon-base icon-base-circle-close" @click="handleClose"></i>
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
@import "./../style/mixins";
@include block(notification) {
  margin: 0;
  position: relative;
  padding-right: 24px;
  color: #51515d;
  font-size: 16px;
  line-height: 24px;
  background: var(--orange);
  display: flex;

  ::-webkit-scrollbar {
    height: 4px;
  }

  @media screen and (max-width: $medium-vw) {
    font-size: 12px;
  }

  .icon-base-circle-close {
    cursor: pointer;
    padding: 4px;
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    top: 0;
  }
}
</style>
