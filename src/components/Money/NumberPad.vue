<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="clear">清空</button>
      <button v-if="output.indexOf('+')>= 0 || output.indexOf('-')>= 0"  @click="calculate(output)">=</button>
      <button v-else class="ok" @click="ok">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  finalStr = ''
  input = "";
  total = 0;
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    this.input = button.textContent!;
    this.finalStr = this.output.substr(this.output.length-1,1)
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(this.input) >= 0) {
        this.output = this.input;
      } else {
        //点击小数点
        this.output += this.input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && this.input === ".") {
      return;
    }
    if ('-+'.indexOf(this.finalStr) === -1 && '-+'.indexOf(this.input)>=0) {      
      let result = this.getTotal(this.output);
      this.output = result.toString()
    }
    if('-+'.indexOf(this.finalStr) >= 0 && '-+'.indexOf(this.input)>=0){
      return 
    }
    this.output += this.input;
  }
  remove(): void {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit", parseFloat(this.output));
    this.output = "0";
  }
  getTotal(str: string) {
    let fn = Function;
    return new fn('return ' + str)();
  }
  calculate(str:string){
    this.finalStr = str.substr(str.length-1,1)
    if('-+'.indexOf(this.finalStr) >= 0){
      str = str.substr(0,str.length-1)
    }
    let result = this.getTotal(str)
    this.output = result.toString()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    // @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 5px 16px;
    text-align: right;
    max-height: 60px;
    border-top: 1px solid #e4e4e4;
  }
  .buttons {
    @extend %clearFix;
    > button {
      background: #f7f7f7 !important;
      border: 1px solid #e4e4e4 !important;
      font-size: 20px;
      width: 25%;
      height: 48px;
      float: left;
      background: transparent;
      border: none;
      cursor: pointer;
      &.ok {
        background: #ffda44;
      }
    }
  }
}
</style>