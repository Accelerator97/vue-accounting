<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="append('1')">1</button>
      <button @click="append('2')">2</button>
      <button @click="append('3')">3</button>
      <button @click="deleteContent">删除</button>
      <button @click="append('4')">4</button>
      <button @click="append('5')">5</button>
      <button @click="append('6')">6</button>
      <button @click="append('+')">+</button>
      <button @click="append('7')">7</button>
      <button @click="append('8')">8</button>
      <button @click="append('9')">9</button>
      <button @click="append('-')">-</button>
      <button @click="append('.')">.</button>
      <button @click="append('0')">0</button>
      <button @click="clear">清空</button>
      <button @click="getFinalResult(output)" v-if="isStarted">=</button>
      <button class="ok" @click="ok" v-else>OK</button>
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
  isDecimalAdded = false; //判断小数点是否输入
  isOperatorAdded = false; //判断运算符运算符是否输入
  isStarted = false; //判断数字是否输入

  isOperator(character: string) {
    //判断是否是运算符号
    return ["+", "-"].indexOf(character) > -1;
  }
  append(character: string) {
    //初始值是0，并且没有输入运算符
    if (this.output === "0" && !this.isOperator(character)) {
      if (character === ".") {
        this.output += character;
        this.isDecimalAdded = true
      } else {
        this.output = character;
      }
      this.isStarted = true;
      return;
    }
    //输入数字
    if (!this.isOperator(character)) {
      if (character === "." && this.isDecimalAdded === true) {
        return;
      }
      if (character === ".") {
        this.isDecimalAdded = true;
        this.isOperatorAdded = true
      }else{
        this.isOperatorAdded = false
      }
      this.output += character;
      this.isStarted = true;
    }

    //输入运算符
    if(this.isOperator(character) && !this.isOperatorAdded){
      this.output += character
      this.isDecimalAdded = false 
      this.isOperatorAdded = true
      this.isStarted = true;
    }
  }
  calculate(str: string) {
    let fn = Function;
    return new fn("return " + str)();
  }
  getFinalResult(str:string){
      let result = this.calculate(str).toFixed(2)
      this.output = result
      this.isStarted = false
  }
  clear() {
    this.output = "0";
    this.isDecimalAdded = false;
    this.isOperatorAdded = false;
    this.isStarted = false;
  }
  deleteContent(){
    const lastStr = this.output.substr(this.output.length-1,1)
    if (this.output.length === 1) {
      this.output = "0";
      return 
    }
    if(lastStr === '.'){
      this.output = this.output.slice(0, -1);
      this.isDecimalAdded = false
    }else if('+-'.indexOf(lastStr) >=0){
      this.output = this.output.slice(0, -1);
      this.isOperatorAdded = false
    }else{
      this.output = this.output.slice(0, -1);
    }
    
  }

  ok() {
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit", parseFloat(this.output));
    this.output = "0";
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
      font-size: 20px;
      width: 25%;
      height: 48px;
      float: left;
      background: transparent;
      border: 1px solid #e4e4e4;
      &.ok {
        background: #ffda44;
      }
    }
  }
}
</style>