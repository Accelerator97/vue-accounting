<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id">
        <div
          class="tagIcon"
          @click="toggle(tag)"
          :class="{
            selected:
              selectedTag.indexOf(tag) >= 0 ||
              (previousTag && previousTag[0].id === tag.id),
          }"
        >
          <Icon :iconName="tag.iconName"></Icon>
        </div>
        <span>{{ tag.name }}</span>
      </li>
      <li @click="edit">
        <div class="tagIcon" >
          <Icon iconName="shezhi"/>
        </div>
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
  @Prop() readonly previousTag?: tag[];
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
  font-size: 12px;
  padding: 10px;
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
      width: 20%;
      height: 60px;
      border-radius: 50%;
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
      .tagIcon {
        background: #ddd;
        padding: 5px;
        text-align: center;
        vertical-align: middle;
        margin-bottom: 2px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        &.selected {
          background: #ffda44;
        }
      }
      span {
        padding-left: 2px;
        min-width: 2em;
      }
    }
  }
}
</style>