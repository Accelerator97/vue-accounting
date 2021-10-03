<template>
  <Layout>
    <div class="topNav">
      <div class="title">
        <span>明细</span>
      </div>
      <div class="chooseDate">
        <div class="chooseyear">
          <select @change="getyear($event.target.value)">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <span>年</span>
        </div>
        <div class="chooseMonth">
          <select @change="getmonth($event.target.value)">
            <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
          </select>
          <span>月</span>
        </div>
      </div>
    </div>

    <ol v-if="groupList.length > 0">
      <li v-for="group in groupList" :key="group.title" class="detail">
        <ol>
          <h3 class="detail-title">
            {{ beautify(group.title) }}
            <span>{{ group.total }}</span>
          </h3>
          <li
            v-for="(item, index) in group.items"
            :key="index"
            class="detail-item"
          >
            <div>
              <Icon :iconName="item.tag[0].iconName"></Icon>
              <span>{{ item.tag[0].name }}</span>
            </div>
            <span>{{ item.type }}{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else>目前没有相关记录</div>
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
  year?: number = dayjs().year();
  month?: number = dayjs().month() + 1;
  get chooseDate() {
    return `${this.year}-${this.month}`;
  }
  get years() {
    let endYear = dayjs().year();
    let y = 1970;
    const result: number[] = [];
    while (y <= endYear) {
      result.unshift(y);
      y++;
    }
    return result;
  }
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
    console.log(newList);
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
      group.total = group.items.reduce(
        (sum, items) => sum + parseFloat(items.type + items.amount),
        0
      );
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  mounted() {
    console.log(this.groupList);
  }
  getyear(y: number) {
    this.year = y;
  }
  getmonth(m: number) {
    this.month = m;
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
}
</script>

<style lang="scss" scoped>
.topNav {
  .title {
    text-align: center;
    font-size: 24px;
  }
  .chooseDate {
    display: flex;
  }
}

.detail {
  &-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>