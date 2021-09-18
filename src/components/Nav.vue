<template>
  <nav>
    <router-link to="/money" class="item"> <Icon name="accounting" />记账</router-link>
    | <router-link to="/label" class="item"> <Icon name="label" />标签</router-link> |
    <router-link to="/statistics" class="item"> <Icon name="statistics" />统计</router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
nav{
  display: flex;
  box-shadow: ;
  >.item{

  }
}
</style>