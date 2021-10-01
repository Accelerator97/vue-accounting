<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <div class="DateandNotes">
      <div class="Money-notes">
        <FormItem
          field-name="备注"
          placeholder="在这里输入备注"
          :value.sync="record.notes"
        />
      </div>
      <div class="Money-createAt">
        <FormItem
          field-name="日期"
          type="date"
          placeholder="在这里输入日期"
          :value.sync="record.createAt"
        />
      </div>
    </div>
    <Tags @update:value="onUpdateTags" :type.sync="record.type"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component,Watch } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tags, Tabs, NumberPad },
})
export default class Money extends Vue {
  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: new Date().toISOString(),
  };
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords"); //从localstorage中拿到recordList
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("至少选择一个标签");
    }
    if(!this.record.amount || this.record.amount === 0){
       return window.alert("请输入金额");
    }
    //将record保存到recordListModel里面的data中
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("保存成功");
      this.record.notes = "";
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
::v-deep .tabs .tabs-item{
  max-height: 48px;
}
.DateandNotes {
  position: relative;
  min-height: 50px;
  margin-bottom:10px;
}
.Money-notes {
  padding: 15px 0;
  position: absolute;
  left: 0;
  top:50%;
  transform:translateY(-50%)
}
.Money-createAt {
  padding: 15px 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform:translateY(-50%)
}
</style>