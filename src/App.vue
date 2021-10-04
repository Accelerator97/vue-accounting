<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Provide } from "vue-property-decorator";

@Component
export default class App extends Vue {
  isRouterAlive = true;
  reload() {
    this.isRouterAlive = false;
    this.$nextTick(function () {
      this.isRouterAlive = true;
    });
  }
  @Provide() reloadWeb = this.reload;
  mounted() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
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
  &::-webkit-scrollbar {
    display: none;
  }
}
#app {
  max-width: 500px;
  margin: 0 auto;
}
</style>
