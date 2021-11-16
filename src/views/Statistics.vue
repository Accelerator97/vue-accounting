<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <DatePicker
      v-model="chooseDate"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择日期"
      class="chooseDate"
    />
    <div class="main">
      <div class="report">
        <div v-if="type === '-'">
          本月支出：{{ beautify(groupList[0].total) }}元
          <div>共计{{ groupList[0].items.length }}条支出项目</div>
        </div>
        <div v-if="type === '+'">
          本月收入：{{ beautify(groupList[0].total) }}元
          <div>共计{{ groupList[0].items.length }}条收入项目</div>
        </div>
      </div>
      <div class="chart-wrapper" ref="chartWrapper">
        <Chart :options="chartOptions" class="chart" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import Vue from "vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";

type CategoryArray = { name: string; value: number };

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
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
      .filter((item) => item.type === this.type); //支出或收入类型筛选
    if (newList.length === 0) {
      return [{ title: this.chooseDate, items: [], total: 0 }];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM"),
        items: newList,
      },
    ];
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
  created() {
    console.log(this.valueNameList);
  }
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }
  get valueNameList() {
    const totalMap = new Map();
    const { items } = this.groupList[0];
    for (let i = 0; i < items.length; i++) {
      const name = (items[i].tag[0] as any).name;
      const value = items[i].amount;
      if (totalMap.has(name)) {
        const preValue = totalMap.get(name);
        const currentValue = preValue + value;
        totalMap.set(name, currentValue);
      } else {
        totalMap.set(name, value);
      }
    }
    return [...totalMap];
  }
  get chartOptions() {
    const chartData = this.valueNameList.reduce((result, item) => {
      result.push({ name: item[0], value: item[1] });
      return result;
    }, [] as CategoryArray[]);
    return {
      series: [
        {
          data: chartData,
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: "{b}:{c}元({d}%)",
      },
      roam : 'scale'
    };
  }
  beautify(number:number){
    return Math.round(number * 100) /100
  }
}
</script>

<style lang="scss" scoped>
  .chooseDate {
    padding-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    ::v-deep .el-input__inner {
      background-color: inherit;
      padding-left: 70px;
      font-size: 16px;
    }
  }
  .main {
    overflow: auto;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      display: none;
    }
    .report {
      padding-top: 10px;
      display: flex;
      justify-content: center;
    }
    .chart {
      overflow: auto;
      max-height: 395px;
      ::v-deep .canvas {
        display: flex;
        height: inherit;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

</style>