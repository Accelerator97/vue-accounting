<template>
  <Layout class-prefix="layout">
    <NumberPad  :value.sync="record.amount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
    <FormItem field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes" />
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template> 

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component, Watch } from "vue-property-decorator";
import { recordListModel } from "@/models/recordListModel";
import { tagsListModel } from "@/models/tagsListModel";

type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?:Date;
}

@Component({
  components: { Tags, Types, NumberPad },
})


export default class Money extends Vue {
  tags = tagsListModel.fetch()
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList = recordListModel.fetch();
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const record2:RecordItem = recordListModel.clone(this.record); //深拷贝
    record2.createAt = new Date();
    this.recordList.push(record2);
    // console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordListChanged() {
    recordListModel.save(this.recordList)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>
<style lang="scss" scoped>
</style>