<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="accounting" />记账</router-link
    >
    |
    <router-link to="/label" class="item" active-class="selected">
      <Icon name="label" />标签</router-link
    >
    |
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />统计</router-link
    >
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px rgba(109, 102, 102, 0.25);
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.3333%;
    display: flex;
    justify-self: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: red;
  }
}
</style>