<template>
  <section>
    <bread-crumb>
    </bread-crumb>
    <el-row class="toolbar">
      <el-col :span="12">
        <h3>My Open Tickets</h3>
      </el-col>
      <el-col :span="12">
        <h3>Ticket Stats</h3>
        <div id="chartPie" style="height:300px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import dateFormat from "dateformat";
import echarts from "echarts";

export default {
  data() {
    return {
      chartPie: null,
      chartLine: null,
      isvList: []
    };
  },
  methods: {
    drawPieChart() {
      this.chartPie = echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "Count",
            type: "pie",
            radius: "70%",
            center: ["55%", "50%"],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}: {c}"
                },
                labelLine: { show: true }
              }
            },
            data: [
              { value: 335, name: "Submitted" },
              { value: 310, name: "Processing" },
              { value: 234, name: "Wait for confirm" },
              { value: 135, name: "Solved" }
            ]
          }
        ]
      });
    },
  },
  mounted() {
    this.drawPieChart();
  }
};
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  float: left;
}
</style>
