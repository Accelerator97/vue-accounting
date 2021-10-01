<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
      >
        <Icon :iconName="tag.iconName"></Icon>
        <span>{{ tag.name }}</span>
      </li>
      <li class="setting">
        <Icon iconName="shezhi" />
        <router-link :to="`/label`"><span>设置</span></router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
@Component
export default class Tags extends mixins(TagHelper) {
  @Prop(String)readonly type!:string
  selectedTags: string[] = [];
  get tagList() {
    return this.$store.state.tagList.filter((tag: { mold: string; }) => tag.mold === this.type)
  }
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  background: white;
  max-height: 160px;
  overflow: auto;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    > li {
      margin-bottom: 10px;
      $bg: #d9d9d9;
      background: $bg;
      width: 20%;
      $h: 48px;
      line-height: $h;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      span {
        padding-left: 2px;
      }
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
      &.setting{
        cursor: pointer;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>