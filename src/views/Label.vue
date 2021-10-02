<template>
  <Layout>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="tags">
      <router-link v-for="tag in tags" :key="tag.id" :to="`/label/edit/${tag.id}`" class="tag">
      <Icon :iconName="tag.iconName" />
      <span>{{tag.name}}</span> 
      <Icon iconName="caozuo" class="edit"/>
      </router-link>
    </div>
    <div class="createTag-Wrapper">
      <router-link :to="`/label/add`"><Button class="createTag">新建标签</Button></router-link>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue"
import Tabs from "@/components/Tabs.vue"
import {mixins} from 'vue-class-component'
import TagHelper from '@/mixins/TagHelper'
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components:{Button,Tabs},
})
export default class Label extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  type='-'
  get tags(){
    return this.$store.state.tagList.filter((tag: { mold: string; }) => tag.mold === this.type)
  }
  created() {
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 1.5em;
      height: 1.5em;
      color: #666;
      margin-right: 16px;
    }
    .edit{
      margin-left: auto;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-Wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>