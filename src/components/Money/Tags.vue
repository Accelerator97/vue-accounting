<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTag.indexOf(tag) >= 0 }"
      >
        <Icon :iconName="tag.iconName"></Icon>
        <span>{{ tag.name }}</span>
      </li>
      <li @click="edit">
        <Icon iconName="shezhi" />
        <span>设置</span>
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
    const index = this.selectedTag.indexOf(tag);
    if (index >= 0) {
      this.selectedTag = this.selectedTag.filter((item) => item.id !== tag.id);
    } else {
      this.selectedTag = [tag];
      this.$emit("update:value", this.selectedTag);
    }
  }
  edit() {
    this.$router.push("/label");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  font-size: 14px;
  padding-top: 5px;
  display: flex;
  background: white;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > .current {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: space-between;
    align-content: flex-start;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      $bg: #d9d9d9;
      background: $bg;
      width: 20%;
      border-radius: 10px;
      margin-right: 12px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      /*最后一行是3个元素*/
      &:last-child:nth-child(4n - 1) {
        margin-right: calc(20% + 20% / 3);
      }
      /* 如果最后一行是2个元素 */
      &:last-child:nth-child(4n - 2) {
        margin-right: calc(40% + 40% / 3);
      }
      span {
        padding-left: 2px;
        min-width: 2em;
      }
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
}
</style>