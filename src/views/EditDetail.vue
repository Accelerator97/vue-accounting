<template>
  <div class="editDetail">
    <div class="navBar">
      <Icon iconName="left" class="leftIcon" @click="goback" />
      <span class="title">编辑明细</span>
      <span class="rightIcon"></span>
    </div>
    <ul class="detail-item">
      <li>
        <span>{{ currentRecord.tag[0].name }}</span
        ><Icon :iconName="currentRecord.tag[0].iconName" />
      </li>
      <li>
        <span>类型</span>
        <span v-if="currentRecord.type === '-'"> 支出 </span>
        <span v-else>收入</span>
      </li>
      <li>
        <span>金额</span>
        <span>{{ currentRecord.amount }}</span>
      </li>
      <li>
        <span>时间</span>
        <span>{{ currentRecord.createAt }}</span>
      </li>
      <li>
        <span>备注</span>
        <span v-if="currentRecord.notes !== ''">{{ currentRecord.notes }}</span>
        <span v-else>无</span>
      </li>
    </ul>
    <div class="operation">
      <Button class="delete">删除</Button>
      <Button class="edit">编辑</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
})
export default class EditDetail extends Vue {
  detailItem?: RecordItem;
  get currentRecord() {
    return this.$store.state.currentRecord;
  }
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
    const id = this.$route.params.id;
    this.$store.commit("setCurrentRecord", id);
    if (!this.currentRecord) {
      this.$router.replace("/404");
    }
  }
  goback() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.editDetail {
  display: flex;
  flex-direction: column;
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
  .detail-item {
    li {
      height: 36px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
  .operation {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    .edit {
      width: 96px;
      text-align: center;
    }
    .delete {
      width: 96px;
      text-align: center;
    }
  }
}
</style>