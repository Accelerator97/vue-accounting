<template>
     <button class="button" @click="$emit('click',$event)"><slot/></button>
     <!-- 点击的是button,怎么触发Button上的click事件，就是在button上通过emit将点击的event事件传递出去-->
     <!-- 或者<Button class="createTag" @click.native="createTag">新建标签</Button> -->
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component
    export default class Button extends Vue {
        
    }
</script>

<style lang="scss" scoped>
.button {
  background: #ffda44;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-Wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>