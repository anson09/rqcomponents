<template>
  <div id="app">
    <RqHeader></RqHeader>  
    <RqPersonalCenter
      :uid="132782"
      @follow="log"
      @redirect="log"
    ></RqPersonalCenter>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    log(...params) {
      console.log(params)
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-family: sans-serif;

}
</style>