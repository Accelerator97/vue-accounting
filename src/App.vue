<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    // We listen to the resize event
    window.addEventListener("resize", () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      // console.log(vh);
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body {
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
}
#app{
  max-width: 500px;
  margin: 0 auto;
}
</style>
