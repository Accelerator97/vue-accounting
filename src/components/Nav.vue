<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon iconName="accounting" />记账</router-link
    >

    <router-link to="/label" class="item" active-class="selected">
      <Icon iconName="label" />标签</router-link
    >
    <router-link to="/detail" class="item" active-class="selected">
      <Icon iconName="detail" />明细</router-link
    >
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon iconName="statistics" />统计</router-link
    >
    
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outterShadow;
  display: flex;
  flex-direction: row;
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
    color: $color-higlight;
  }
}
</style>