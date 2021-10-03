<template>
  <Layout>
    <div class="navBar">
      <Icon iconName="left" class="leftIcon" @click="goback" />
      <span class="title">新增标签</span>
      <span class="rightIcon"></span>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <div class="form-wrapper">
      <Icon :iconName="iconName" />
      <FormItem
        class="input"
        :value.sync="tagName"
        field-name="标签名"
        placeholder="请输入标签名（不超过四个字符）"
      ></FormItem>
    </div>
    <div class="icons-list">
      <ul>
        <li
          v-for="icon in icons"
          :key="icon.id"
          @click="setIconName(icon.iconName)"
        >
          <Icon :iconName="icon.iconName" />
        </li>
      </ul>
    </div>
    <div class="button-wrapper">
      <Button @click="create" class="updateButton">创建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import { icons } from "@/lib/icon";
@Component({
  components: { Button, Tabs },
})
export default class extends Vue {
  recordTypeList = recordTypeList;
  type = "-";
  iconName = "canying";
  icons = icons;
  tagName = "";
  goback() {
    this.$router.back();
  }
  setIconName(iconName: string) {
    this.iconName = iconName;
  }
  create() {
    let { tagName, iconName, type } = this;
    if (!tagName || tagName.length === 0) {
      window.alert("请输入标签名");
      return;
    }
    this.$store.commit("createTag", {
      name: tagName,
      iconName: iconName,
      mold: type,
    });
    if (this.$store.state.createTagError === null) {
      window.alert("创建成功");
      this.$router.back();
    }else {
      window.alert("创建失败：标签名重复");
      tagName = "";
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  display: flex;
  padding-left: 15px;
  align-items: center;
  > .input {
    flex-grow: 1;
  }
}
.icons-list {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    li {
      padding: 20px;
      > .icon {
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
  > .updateButton {
    margin-right: 30px;
  }
}
</style>