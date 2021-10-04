<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
        <input
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
    </label>
  </div>
</template>

<script lang="ts" >
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.notes {
  font-size: 14px;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    min-width: 40px;
  }
  input {
    height: 40px;
    background: transparent;
    border: none;
    flex-grow: 1;
    padding-right: 10px;
  }
}
</style>