<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{selected:selectedTag.indexOf(tag) >= 0}"
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
@Component
export default class Tags extends Vue {
  @Prop(String) readonly type!: string;
  selectedTag: tag[] = [];
  get tagList() {
    return this.$store.state.tagList.filter(
      (tag: { mold: string }) => tag.mold === this.type
    );
  }
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tag: tag) {
    const index  = this.selectedTag.indexOf(tag)
    if(index>=0){
      this.selectedTag = this.selectedTag.filter(item => item.id !== tag.id)
    }else{
      this.selectedTag = [tag]
      this.$emit('update:value',this.selectedTag)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding: 5px;
  display: flex;
  flex-grow: 1;
  background: white;
  overflow: auto;
  > .current {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    overflow: auto;
    justify-content: flex-start;
    align-content: flex-start;
    &::-webkit-scrollbar {
      display: none;
    }
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      $bg: #d9d9d9;
      background: $bg;
      width: 20%;
      $h: 50px;
      height: $h;
      border-radius: 10px;
      margin-right: 12px;
      span {
        padding-left: 2px;
        min-width: 2em;
      }
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
      &.setting {
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