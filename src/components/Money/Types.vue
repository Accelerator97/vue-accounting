<template>
    <div>
      <ul class="types">
        <li :class=" type === '-' && 'selected'" @click="selectType('-')">支出</li>
        <li :class=" type === '+' && 'selected'" @click="selectType('+')">收入</li>
      </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator';
@Component
export default  class Types extends Vue{
  type ='-';// '-'表示支出，'+'表示收入
  @Prop(Number) xxx:number | undefined
  //Number告诉Vue xxx运行时是一个Number
  //Prop告诉Vue xxx是prop 不是data
  //xxx 是属性名
  // number | undefined 就是xxx的类型，告诉TS的xxx编译时的类型
  selectType(type:string){
    if(type !== '-' && type !== '+'){
      throw new Error('type is unknown')
    }
    this.type = type 
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    line-height: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>