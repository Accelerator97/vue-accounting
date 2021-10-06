<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="tags">
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        :to="`/label/edit/${tag.id}`"
        class="tag"
      >
        <Icon :iconName="tag.iconName" />
        <span>{{ tag.name }}</span>
        <Icon iconName="caozuo" class="edit" />
      </router-link>
    </div>
    <div class="createTag-Wrapper">
      <router-link :to="`/label/add`"
        ><Button class="createTag">新建标签</Button></router-link
      >
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";

@Component({
  components: { Button, Tabs },
})
export default class Label extends Vue {
  recordTypeList = recordTypeList;
  type = "-";
  get tags() {
    return this.$store.state.tagList.filter(
      (tag: { mold: string }) => tag.mold === this.type
    );
  }
  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding: 0 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    svg {
      width: 1.5em;
      height: 1.5em;
      color: #666;
    }
    .edit {
      margin-left: auto;
    }
    span{
      margin-left: 15px;
    }
  }
}
.createTag {
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  margin:0 auto;
  &-Wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>