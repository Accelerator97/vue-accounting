<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" class="leftIcon" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" field-name="标签名" placeholder="请输入标签名"></FormItem>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tagsListModel } from "@/models/tagsListModel";
import Button from "@/components/Button.vue"

@Component({
  components:{Button}
})
export default class EditLabel extends Vue {
  tag ?: {id:string,name:string} = undefined
  created() {
    const id = this.$route.params.id;
    const tags = tagsListModel.fetch();
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag
    } else {
      this.$router.replace("/404");
    }
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
  > .title {
  }
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
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>