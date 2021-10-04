<template>
  <div class="layout-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: ["classPrefix"],
};
</script>

<style lang="scss">
.layout-wrapper {
  display: flex;
  flex-direction: column;
  .content {
    overflow: auto; //如果内容过多显示滚动条
    flex-grow: 1;
  }
}
</style>