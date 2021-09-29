<template>
  <div>
    <label class="notes">
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input
          :type="text || type"
          :value="x(value)"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
      <template v-else>
        <input
          :type="text || type"
          :value="value"
          @input="onValueChanged($event.target.value)"
          :placeholder="placeholder"
        />
      </template>
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
  @Prop() type?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  x(isostring:string){
    return dayjs(isostring).format('YYYY-MM-DD')
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
  }
  input {
    height: 40px;
    background: transparent;
    border: none;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>