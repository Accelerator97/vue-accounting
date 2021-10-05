<template>
  <div class="editWrapper">
    <Tabs :data-source="recordTypeList" :value.sync="editRecord.type" />
    <Tags
      @update:value="onUpdateTag"
      :type.sync="editRecord.type"
      :previousTag="editRecord.tag"
      class="tags"
    />
    <div class="wrapper">
      <div class="notes">
        <FormItem
          field-name="备注:"
          placeholder="在这里输入备注"
          :value.sync="editRecord.notes"
        />
      </div>
      <DatePicker
        v-model="editRecord.createAt"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        class="createAt"
      />
    </div>
    <NumberPad :value.sync="editRecord.amount" @submit="updateRecord" />
  </div>
</template> 

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import { Component, Watch } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tags, Tabs, NumberPad },
})
export default class EditDetail extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  get editRecord(){
    return this.$store.state.editRecord
  }
  recordTypeList = recordTypeList;
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetcheditRecord");
    // console.log(this.editRecord);
  }
  onUpdateTag(value: []) {
    this.editRecord.tag = value;
    // console.log(value);
  }
  updateRecord() {
    if (
      !(this.editRecord as any).tag ||
      (this.editRecord as any).tag.length === 0
    ) {
      return window.alert("请选择标签");
    }
    if (
      !(this.editRecord as any).amount ||
      (this.editRecord as any).amount === 0
    ) {
      return window.alert("请输入金额");
    }
    this.$store.commit("updateRecord",this.editRecord);
    this.$router.back();
    
  }
}
</script>

<style lang="scss" scoped>
.editWrapper{
  display: flex;
  flex-direction: column;
  .tags{
  flex-grow: 1;
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

}

</style>