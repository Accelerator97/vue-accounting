<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#' + iconName" />
  </svg>
</template>

<script lang="ts">
let importAll = (webpackContext: __WebpackModuleApi.RequireContext) => {
  webpackContext.keys().forEach(webpackContext);
};
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  name: "Icon",
  props: ["iconName"],
};
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.6em;
  fill: currentColor;
  overflow: hidden;
}
</style>