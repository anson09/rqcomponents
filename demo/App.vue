<template>
  <div id="app">
    <RqHeader
      @logout="log"
    ></RqHeader>  
    <RqPersonalCenter
      :uid="268871"
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
  box-sizing: inherit;
}
</style>