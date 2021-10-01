<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart :options="chartOptions" class="chart" />
    </div>
    <ol v-if="groupList.length > 0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagsToString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span> ￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-result">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import intervalList from "@/constants/intervalList";
import Vue from "vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
import _ from "lodash";
import day from "dayjs";

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
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
      group.total = group.items.reduce((sum, items) => sum + items.amount, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
  }
  tagsToString(tags: tag[]) {
    if (tags.length === 0) {
      return "无";
    } else {
      const names = tags.map((item) => item.name);
      return names.join(",");
    }
  }
  beautify(title: string) {
    const day = dayjs(title);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = day(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.recordList, { createAt: dateString });
      array.push({ key: dateString, value: found ? found.amount : 0 });
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
    }
    return array;
  }
  get chartOptions() {
    const keys = this.keyValueList?.map((item) => item.key);
    const values = this.keyValueList?.map((item) => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: { alignWithLabel: true },
        axisLine:{lineStyle:{color:'#666'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: { borderWidth: 1, color: "#666", borderColor: "#666" },
          data: values,
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}",
      },
    };
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: white;
}
.notes {
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}
.no-result {
  padding: 16px;
  text-align: center;
}
.chart {
  width: 430%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>