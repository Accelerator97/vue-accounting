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
          <div
            class="tagIcon"
            @click="toggle(icon.iconName)"
            :class="{
              selected: iconName === icon.iconName,
            }"
          >
            <Icon :iconName="icon.iconName" />
          </div>
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
  toggle(name: string) {
    this.iconName = name;
  }
  create() {
    let { tagName, iconName, type } = this;
    if (!tagName || tagName.length > 4) {
      window.alert("标签名不能为空或者不要超过四个字符");
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
    } else {
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
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      padding: 10px;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      > .tagIcon {
        background: #ddd;
        padding: 5px;
        text-align: center;
        vertical-align: middle;
        margin-bottom: 5px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        &.selected {
          background: #ffda44;
        }
      }
    }
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  > .updateButton {
    margin: 0 auto;
  }
}
</style>