<template>
  <charts :option="statisticsOption" height="50%" />
</template>

<script>
import * as echarts from "echarts";
import charts from "@/components/charts";
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint;
    // console.log(shape);
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - offsetX, shape.y - offsetY];
    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
    const c4 = [shape.x + offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
    const c3 = [shape.x, shape.y - offsetX];
    const c4 = [shape.x - offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 注册三个面图形
echarts.graphic.registerShape("CubeLeft", CubeLeft);
echarts.graphic.registerShape("CubeRight", CubeRight);
echarts.graphic.registerShape("CubeTop", CubeTop);
const offsetX = 12;
const offsetY = 6;
const statisticsOption = {
  grid: {
    left: "5%",
    top: "8%",
    // containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params, ticket, callback) {
      const item = params[1];
      return `<div style="
                      background: linear-gradient(321deg, #FDFEFF 0%, #F4F7FC 100%);
                      border-radius: 6px;border: 1px solid;
                      border-image: linear-gradient(337deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
                      padding:8px;backdrop-filter: blur(10px);">
                      <div style="color: #1D2129;margin-bottom:8px;font-weight: bold;">${item.name}</div>
                      <div style="padding:10px;border-radius: 4px; background: rgba(255,255,255,0.8);box-shadow: 6px 0px 20px 0px rgba(34,87,188,0.1);">用户数量:<span style="float:right;font-weight: bold;margin-left:10px">${item.value}</span></div></div>`;
    },
  },
  xAxis: {
    type: "category",
    data: [],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      fontSize: 14,
      formatter: (value) => {
        return value?.slice(0, 4) + "...";
      },
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      fontSize: 14,
    },
    // boundaryGap: ['20%', '20%'],
  },
  dataZoom: [
    {
      type: "inside",
    },
    {
      type: "slider",
    },
  ],
  series: [
    {
      type: "custom",
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)]);
        return {
          type: "group",
          children: [
            {
              type: "CubeLeft",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#7378FF",
                  },
                  {
                    offset: 1,
                    color: "rgba(115,120,255,0)",
                  },
                ]),
              },
            },
            {
              type: "CubeRight",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#565CFF",
                  },
                  {
                    offset: 1,
                    color: "rgba(86,92,255,0)",
                  },
                ]),
              },
            },
            {
              type: "CubeTop",
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#989CFF",
                  },
                  {
                    offset: 1,
                    color: "#989CFF",
                  },
                ]),
              },
            },
          ],
        };
      },
      data: [],
    },
    // {
    //   type: 'bar',
    //   itemStyle: {
    //     color: 'transparent',
    //   },
    //   tooltip: {},
    //   data: VALUE,
    // },
    {
      type: "pictorialBar",
      data: [],
      symbol: "diamond",
      animation: false,
      //   symbolOffset: [0, '-0%'],
      symbolSize: [offsetX * 2, offsetX * 1],
      itemStyle: {
        normal: {
          borderWidth: 0,
          color: "#7479FF",
        },
      },
    },
  ],
};
export default {
  components: { charts },
  data() {
    return {
      statisticsOption,
    };
  },

  mounted() {
    this.statisticsOption.xAxis.data = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'];
    this.statisticsOption.series[0].data = [120, 200, 150, 80, 70, 110];
    this.statisticsOption.series[1].data = [120, 200, 150, 80, 70, 110];
  },
  beforeDestroy() {},
  methods: {},
};
</script>
<style lang="less" scoped></style>
<style>
.echarts-slider-handle {
  border-radius: 4px;
}
</style>
