<template>
  <div id="app" >
    <RqHeader @auth="log" ></RqHeader>
    <!-- <RqPersonalCenter :uid="196300" @redirect="log"></RqPersonalCenter> -->
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
</style>
