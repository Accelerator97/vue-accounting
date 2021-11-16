<template>
  <Layout>
    <div class="title">
      <span>明细</span>
    </div>
    <DatePicker
      v-model="chooseDate"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择日期"
      class="chooseDate"
    />
    <ol v-if="groupList.length > 0" class="detail-list">
      <li v-for="group in groupList" :key="group.title" class="detail">
        <ol>
          <h3 class="detail-title">
            {{ beautify(group.title) }}
            <span>结余：{{ group.total }}元</span>
          </h3>
          <li
            @click="editDetail(item.id)"
            v-for="(item, index) in group.items"
            :key="index"
            class="detail-item"
          >
            <div class="itemTag">
              <Icon class="itemTag-Icon" :iconName="item.tag[0].iconName" ></Icon>
              <span class="itemTag-Name" >{{ item.tag[0].name }}</span>
            </div>
            <span>{{ item.type }}{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="notfound"><span> 目前没有相关记录</span></div>
  </Layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormItem from "@/components/FormItem.vue";
import Icon from "@/components/Icon.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { FormItem, Icon },
})
export default class Detail extends Vue {
  chooseDate = dayjs().format("YYYY-MM");
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const newList = clone(recordList)
      .filter(
        (item) => dayjs(item.createAt).format("YYYY-MM") === this.chooseDate //月份筛选
      )
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      let current = newList[i];
      let last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.forEach((group) => {
      group.total = Math.round(group.items.reduce(
        (sum, items) => sum + parseFloat(items.type + items.amount),
        0
      )*100)/100;
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  beautify(title: string) {
    const now = dayjs();
    const day = dayjs(title);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "month")) {
      return day.format("M月D日");
    }
  }
  editDetail(id:string){
    this.$router.push({path:'/detail/item',query:{id:id}})
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 64px;
  margin-bottom: 5px;
  background: #ffda44;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
  padding-top: 5px;
}
.chooseDate {
  left: 50%;
  transform: translateX(-50%);
  ::v-deep .el-input__inner {
    background-color: inherit;
    padding-left: 70px;
    font-size: 16px;
  }
}
.detail-list {
  overflow: auto;
  padding: 10px;
  .detail {
    &:not(:first-child) {
      margin-top: 15px;
    }
    &-title {
      display: flex;
      justify-content: space-between;
      padding:10px;
    }
    &-item {
      &:not(:first-child) {
        margin-top: 15px;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 10px;
      > .itemTag{
        display: flex;
        align-items: center;
        .itemTag-Name{
          font-size: 16px;
          margin-left: 15px;
        }
      }
    }
  }
}
.notfound {
  margin-top: 15px;
  text-align: center;
}
</style>