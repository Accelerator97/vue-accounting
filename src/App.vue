<template>
  <div id="app">
    <router-view v-if="isRouterAlive" class="router-view" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Provide } from "vue-property-decorator";
@Component
export default class App extends Vue {
  //提交后刷新页面
  isRouterAlive = true;
  reload() {
    this.isRouterAlive = false;
    this.$nextTick(function () {
      this.isRouterAlive = true;
    });
  }
  @Provide() reloadWeb = this.reload;
  mounted() {
    //禁止双击放大
    window.onload = function () {
      document.addEventListener("touchstart", function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      let lastTouchEnd = 0;
      document.addEventListener(
        "touchend",
        function (event) {
          const now = new Date().getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        },
        false
      );
      document.addEventListener("gesturestart", function (event) {
        event.preventDefault();
      });
    };
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
html {
  height: 100%;
}
body {
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
#app {
  max-width: 500px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  > .router-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
