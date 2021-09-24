<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="Money-notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags @update:value="onUpdateTags"/>
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList"


@Component({
  components: { Tags, Tabs, NumberPad },
})
export default class Money extends Vue {
  get recordList():RecordItem[]{
    return this.$store.state.recordList;
  }
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordTypeList = recordTypeList
  created() {
    this.$store.commit("fetchRecords"); //从localstorage中拿到recordList
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTags(value: string[]) {
    //收集四个组件的value到record
    this.record.tags = value;
  }
  saveRecord() {
    //将record保存到recordListModel里面的data中
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.Money-notes {
  padding: 12px 0;
}
</style>