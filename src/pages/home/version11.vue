<template>
  <div id="countryDom" style="height: 500px; width: 100%" />
</template>

<script>
import * as echarts from "echarts";
import list from "./list.json";
export default {
  props: ["npsParams"],
  watch: {
    npsParams: function (val) {},
  },
  data() {
    return {
      statusChart: null,
      dataParams: this.npsParams,
      npsChartData: {
        xAxisData: [],
        data1: [],
        bottomData: [],
        topData: [],
      },
      selectArr: [],
      selectAll: {
        product: false,
        sku: false,
        geo: false,
        appVersion: false,
        activateDay: false,
        country: false,
      },
      countryOptions: [],
      // 定义被选择的柱状图的索引数组
      selectedIndexes: [],
    };
  },

  mounted() {
    this.initEchars();
    this.getNpsCountryScope({});
  },
  beforeDestroy() {},
  methods: {
    // 初始化柱状图配置
    initEchars() {
      var _this = this;
      var countryDom = document.getElementById("countryDom");
      _this.npsCountryChart = echarts.init(countryDom);
      let colorArr = ["#4E8AFE", "#0B19FF", "#7C9BFF"];
      let actColorArr = ["#BCD3FF", "#79A7FE", "#9EB5FF"];
      let actColor = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: actColorArr[0],
          },
          {
            offset: 0.45,
            color: actColorArr[0],
          },
          {
            offset: 0.65,
            color: actColorArr[1],
          },
          {
            offset: 1,
            color: actColorArr[1],
          },
        ],
      };
      let color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: colorArr[0],
          },
          {
            offset: 0.45,
            color: colorArr[0],
          },
          {
            offset: 0.65,
            color: colorArr[1],
          },
          {
            offset: 1,
            color: colorArr[1],
          },
        ],
      };
      _this.npsCountryOption = {
        tooltip: {
          borderColor: "#FFF",
          formatter: function (params) {
            return (
              '<div style="text-align:left;">' +
              "<div style='margin-top:10px;'>" +
              params.name +
              "</div>" +
              "<div style='margin-top:10px;'>" +
              "样本数：" +
              params.data +
              "" +
              "</div>" +
              "<div style='margin-top:10px;margin-bottom:10px;'>" +
              "NPS：" +
              params.dataIndex +
              "</div>" +
              "</div>"
            );
          },
        },
        grid: {
          left: "6%",
          right: "6%",
          bottom: "6%",
          containLabel: true,
        },
        // 滚动条
        dataZoom: [
          {
            type: "slider", //隐藏或显示（true）组件
            show: true,
            borderRadius: 4,
            backgroundColor: "#E3E8F1", // 组件的背景颜色。
            fillerColor: "#A6B6C6", // 选中范围的填充颜色。
            borderColor: "#fff", // 边框颜色
            showDetail: false, //是否显示detail，即拖拽时候显示详细数值信息
            startValue: 0,
            endValue: 8,
            filterMode: "empty",
            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                //给第一个设置0，第四个设置1，就是垂直渐变
                offset: 0,
                color: "#0B19FF",
              },
              {
                offset: 1,
                color: "#4E8AFE",
              },
            ]),

            width: "95%", //滚动条高度
            height: 8, //滚动条显示位置
            left: "center",
            zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
            handleSize: 0, //控制手柄的尺寸
            bottom: 7, // dataZoom-slider组件离容器下侧的距离
          },
          {
            type: "inside",
            zoomOnMouseWheel: false, //滚轮是否触发缩放
            moveOnMouseMove: true, //鼠标滚轮触发滚动
            moveOnMouseWheel: true,
          },
        ],
        xAxis: {
          type: "category",
          //国家名字
          data: [], // val.xAxisData
          axisLabel: {
            show: true,
            interval: 0, //使x轴上的文字显示完全,
            rotate: 40,
            //设置一行显示几个字,自己设置
            formatter: function (params, index) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 16;
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }

              return "\n\n" + newParamsName;
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
        },
        //y轴国家柱状图数据
        series: [
          // 这块是国家柱状图本身的数据
          {
            name: "",
            type: "pictorialBar",
            symbolOffset: ["0%", "50%"],
            symbolSize: [30 - 4, (10 * (30 - 4)) / 30],
            z: 12,
            symbol: "diamond",
            itemStyle: {
              opacity: 1,
              color: (params) => {
                const name = params.name;
                // 判断柱状图是否被选择
                if (this.selectArr.includes(name)) {
                  return "lightblue";
                } else {
                  return color;
                }
              },
            },
            data: [], // val.bottomData
          },
          // 数据的柱状图
          {
            name: "",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: (params) => {
                  const name = params.name;
                  // 判断柱状图是否被选择
                  if (this.selectArr.includes(name)) {
                    return "lightblue";
                  } else {
                    return color;
                  }
                },
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#252631",
                    fontSize: 12,
                  },
                },
              },
            },
            data: [], // val.data1
          },
          // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
          {
            type: "bar",
            symbol: "diamond",
            barWidth: 30 + 2,
            itemStyle: {
              color: "transparent",
            },
            data: [], // val.data1
          },
          // 数据顶部的样式
          {
            name: "",
            type: "pictorialBar",
            symbol: "diamond",
            symbolOffset: ["0%", "-50%"],
            symbolSize: [30, 10],
            z: 12,
            itemStyle: {
              normal: {
                opacity: 1,
                color: (params) => {
                  const name = params.name;
                  // 判断柱状图是否被选择
                  if (this.selectArr.includes(name)) {
                    return "lightblue";
                  } else {
                    return colorArr[2];
                  }
                },
              },
            },
            symbolPosition: "end",
            data: [], // val.data1
          },
          // 阴影的顶部
          {
            name: "", // 头部
            type: "pictorialBar",
            symbol: "diamond",
            symbolOffset: ["0%", "-50%"],
            symbolSize: [30, 10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "rgba(18, 47, 133,0.5)",
              opacity: 0.3,
              borderWidth: 1,
              borderColor: "rgba(18, 47, 133,1)",
            },
            data: [], // val.topData
          },
          // 后面的背景
          {
            name: "2019",
            type: "bar",
            barWidth: 30,
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "rgba(18, 47, 133,0.3)",
            },
            data: [], // val.topData
          },
        ],
      };

      _this.npsCountryChart.on("click", (params) => {
        const name = params.name;
        // 判断柱状图是否已被选择
        if (this.selectArr.includes(name)) {
          // 如果已被选择，则从数组中移除该索引，并恢复默认样式
          this.selectArr.splice(this.selectArr.indexOf(name), 1);
        } else {
          // 如果未被选择，则添加该索引到数组中
          this.selectArr.push(name);
        }

        console.log(_this.selectArr);
        // if (dataUtil.isNotNull(_this.selectArr)) {
        //   _this.npsCountryOption.series.forEach((res, index) => {
        //     _this.npsCountryOption.series[index].data.forEach(
        //       (data, indexs) => {
        //         // console.log(data, index)
        //         if (index == 0 || index == 1) {
        //           // console.log('_this.npsCountryOption.series', _this.npsCountryOption.series[index])
        //           // this.$set(_this.npsCountryOption.series[index], 'itemStyle', { color: actColor });
        //           // console.log(_this.selectArr.indexOf(_this.npsCountryOption.xAxis.data[indexs]) != -1)
        //           if (
        //             _this.selectArr.indexOf(
        //               _this.npsCountryOption.xAxis.data[indexs]
        //             ) !== -1
        //           ) {
        //             this.$set(
        //               _this.npsCountryOption.series[index],
        //               "itemStyle",
        //               { color: color }
        //             );
        //           }
        //         }
        //       }
        //     );
        //   });
        // }
        // else {
        //     _this.npsCountryOption.series.forEach((item, index) => {
        //         _this.npsCountryOption.series[index].data.forEach((data, index) => {
        //             this.$set(_this.npsCountryOption.series[index], 'itemStyle', { color: color });
        //         });
        //     });
        // }
        _this.npsCountryChart.setOption(_this.npsCountryOption, true);
      });

      _this.npsCountryChart.setOption(_this.npsCountryOption, true);
    },

    // 国家样本量国家样本量 数据
    getNpsCountryScope(val) {
      var _this = this;
      console.log(" _this.npsCountryOption", _this.npsCountryOption);
      _this.npsCountryOption.series[0].data = [];
      _this.npsCountryOption.series[1].data = [];
      _this.npsCountryOption.series[2].data = [];
      _this.npsCountryOption.series[3].data = [];
      _this.npsCountryOption.series[4].data = [];
      _this.npsCountryOption.series[5].data = [];
      _this.npsCountryOption.xAxis.data = [];
      // var params = '';
      // delete params.country;
      // dataAnalysis.getNpsCountryScope(params).then((res) => {
      list.data.forEach((item) => {
        // console.log('_this.npsCountryOption', _this.npsCountryOption);
        _this.npsCountryOption.series[0].data.push(100);
        _this.npsCountryOption.series[1].data.push(item.count);
        _this.npsCountryOption.series[2].data.push(item.count);
        _this.npsCountryOption.series[3].data.push(item.count);
        _this.npsCountryOption.series[4].data.push(1);
        _this.npsCountryOption.series[5].data.push(1);
        _this.npsCountryOption.xAxis.data.push(item.country);
        _this.npsCountryChart.setOption(_this.npsCountryOption, true);
        // npsChartData.data1.push(item.count);
        // npsChartData.xAxisData.push(item.country);
        // npsChartData.nps.push(item.score);
        // npsChartData.bottomData.push(1);
        // npsChartData.bottomData.push(100);
      });
      // });
    },
  },
};
</script>
<style lang="less" scoped></style>
<style>
.echarts-slider-handle {
  border-radius: 4px;
}
</style>
