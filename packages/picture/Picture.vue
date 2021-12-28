<template>
  <picture>
    <source v-if="src.avif" :srcset="src.avif" type="image/avif" />
    <source v-if="src.webp" :srcset="src.webp" type="image/webp" />
    <img
      ref="img"
      loading="lazy"
      decoding="async"
      :src="isSimpleConfig ? src : src.fallback"
    />
  </picture>
</template>

<script>
export default {
  name: "RqPicture",
  props: {
    src: {
      type: [String, Object],
      required: true,
    },
  },
  computed: {
    isSimpleConfig() {
      return typeof this.src !== "object";
    },
  },
  mounted() {
    // 把根元素上的data属性以及class和style等直接移到img上
    Object.values(this.$el.attributes).forEach((val) => {
      this.$refs.img.setAttribute(val.nodeName, val.nodeValue);
      this.$el.removeAttribute(val.nodeName);
    });
  },
};
</script>
