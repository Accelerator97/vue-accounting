<template>
  <Layout>
    <div class="navBar">
      <Icon iconName="left" class="leftIcon" @click="goback" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="form-wrapper">
      <Icon :iconName="currentTag.iconName"/>
      <FormItem
        :value.sync="tagName"
        field-name="标签名"
        placeholder="请输入标签名"
      ></FormItem>
    </div>
    <div class="icons-list">
      <ul>
        <li v-for="icon in icons" :key="icon.id" @click="setIconName(icon.iconName)">
          <Icon :iconName="icon.iconName" />
        </li>
      </ul>

    </div>
    <div class="button-wrapper">
      <Button @click="update" class="updateButton">保存标签</Button>
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import {icons} from '@/lib/icon'
@Component({
  components: { Button,Tabs },
})
export default class EditLabel extends Vue {
  recordTypeList = recordTypeList
  type='-'
  icons=icons
  tagName=''
  get currentTag(){
    return this.$store.state.currentTag
  }
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags')
    this.$store.commit('fetchRecords')
    this.$store.commit('setCurrentTag',id)
    this.tagName = this.currentTag.name

    if (!this.currentTag) {
      this.$router.replace("/404");
    }
  }
  setIconName(iconName:string){
    this.currentTag.iconName = iconName
  }
  update() {
    const {tagName,type} = this
    if(!tagName || tagName.length > 4){
      window.alert('标签名不能为空或者不要超过四个字符')
      return
    }
    console.log('1111')
    this.$store.commit('updateTag',{id:this.currentTag.id,name:tagName,iconName:this.currentTag.iconName,mold:type})
    if(this.$store.state.updateTagError === null){
      window.alert('保存成功')
      this.$router.back()
    }
    console.log('2222')
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit('removeTag',this.currentTag.id)
      this.$router.back();
    }
  }
  goback() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px; //整个navBar的高度为48，字体占了16，剩下的用padding来撑开
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    //为了实现左中右布局(space-between)，特地加了rightIcon
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  display: flex;
  padding-left: 15px;
  align-items: center;
}
.icons-list{
  ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    li{
      padding: 20px;
      > .icon{
        width: 38px;
        height: 38px;
      }
    }
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  > .updateButton{
    margin-right: 30px;
  }
}
</style>