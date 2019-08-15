<template>
  <div id="app" >
    <RqHeader @auth="log" :opacity="true" topic="欢迎试用"></RqHeader>
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
      console.log('111', params);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-family: sans-serif;
  box-sizing: inherit;
}
#app {
  height: 100vh;
  background: url(https://images.alphacoders.com/499/thumb-1920-499786.png);
}
</style>
