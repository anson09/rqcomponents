<template>
  <div id="app">
    <RqHeader @logout="log"></RqHeader>
    <RqPersonalCenter :uid="132782" @redirect="log"></RqPersonalCenter>
  </div>
</template>

<!-- :uid="132782" -->
<!-- :uid="268871" -->

<script>
export default {
  name: "App",
  mounted() {},
  methods: {
    log(...params) {
      console.log(params);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-family: sans-serif;
  box-sizing: inherit;
}
</style>
