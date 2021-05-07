<template>
  <img v-if="useSimpleImg" :src="isSimpleConfig ? src : src.fallback" />
  <picture v-else>
    <source v-if="src.avif" :srcset="src.avif" type="image/avif" />
    <source v-if="src.webp" :srcset="src.webp" type="image/webp" />
    <source v-if="src.fallback" :srcset="src.fallback" />
    <img ref="img" loading="lazy" decoding="async" />
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
    isIE() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    isSimpleConfig() {
      return typeof this.src !== "object";
    },
    useSimpleImg() {
      return this.isIE || this.isSimpleConfig;
    },
  },
  mounted() {
    if (!this.useSimpleImg) {
      // 把根元素上的data属性以及class和style等直接移到img上
      Object.entries(this.$el.attributes).forEach(([, val]) => {
        this.$el.removeAttribute(val.nodeName);
        this.$refs.img.setAttribute(val.nodeName, val.nodeValue);
      });
    }
  },
};
</script>
