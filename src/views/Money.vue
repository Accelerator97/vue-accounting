<template>
  <Layout class-prefix="layout">
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <Tags @update:value="onUpdateTags" :type.sync="record.type" />
    <div class="wrapper">
      <div class="notes">
        <FormItem
          field-name="备注:"
          placeholder="在这里输入备注"
          :value.sync="record.notes"
        />
      </div>
      <DatePicker
        v-model="record.createAt"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="getDate(record.createAt)"
        class="createAt"
      />
    </div>
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component, Inject } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";

@Component({
  components: { Tags, Tabs, NumberPad },
})
export default class Money extends Vue {
  @Inject() reloadWeb: any;
  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tag: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: dayjs().format("YYYY-MM-DD"),
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(value: string[]) {
    this.record.tag = value;
  }
  saveRecord() {
    if (!this.record.tag || this.record.tag.length === 0) {
      return window.alert("请选择标签");
    }
    if (!this.record.amount || this.record.amount === 0) {
      return window.alert("请输入金额");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("保存成功");
      this.reloadWeb();
    }
  }
  getDate(xx: any) {
    console.log(xx);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
  .tags {
    padding-top: 10px;
    flex-grow: 1;
  }
}
.wrapper {
  position: relative;
  min-height: 40px;
  .notes {
    padding: 15px 0;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .createAt {
    max-width: 40%;
    background-color: inherit;
    border: none;
    padding: 15px 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    ::v-deep .el-input__inner {
      border: transparent;
      background-color: inherit;
      padding-left: 40px;
    }
  }
}
</style>