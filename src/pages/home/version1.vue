<template>
  <div class="environmental">
    <transition name="cc" v-if="!isToggled">
      <div class="left aside" style="left: 20px">
        <charts height="14%" title="环境实况">
          <ul class="reality">
            <li>
              <span><img src="@/assets/weather/wendu.png" alt="" />温度</span>
              <br />
              <span class="re-num">{{ realtimeData[2]?.data }}<i>℃</i></span>
            </li>
            <li>
              <span><img src="@/assets/weather/fengli.png" alt="" />风力</span>
              <br />
              <span class="re-num">{{ realtimeData[0]?.data }}<i>m/s</i> </span>
            </li>
            <li>
              <span><img src="@/assets/weather/yuliang.png" alt="" />雨量</span>
              <br />
              <span class="re-num">{{ realtimeData[3]?.data }}<i>mm</i></span>
            </li>
            <li>
              <span><img src="@/assets/weather/shuiwei.png" alt="" />水位</span>

              <br />
              <span class="re-num">{{ realtimeData[4]?.data }}<i>m</i></span>
            </li>
          </ul>
        </charts>
        <charts :option="option[0]" height="21%" title="当前气温"></charts>
        <charts :option="option[1]" height="21%" title="当前风力"></charts>
        <charts :option="option[2]" height="21%" title="当前雨量"></charts>
        <charts :option="option[3]" height="21%" title="当前水位"></charts>
      </div>
    </transition>
    <span
      @click="isToggled = !isToggled"
      class="toggle_icon"
      :class="{ toggled: isToggled }"
    ></span>

    <transition name="cc1" v-if="!isToggled">
      <div class="right aside" style="right: 20px">
        <charts :option="webOption" height="50%" :special="1" title="天气统计">
          <div class="top especia">
            近七天天气情况
            <img src="@/assets/weather/Frame.png" alt="" />
          </div>
        </charts>
        <charts
          :option="statisticsOption"
          height="50%"
          :special="2"
          title="环境统计"
        >
          <div class="statistics">
            <div style="text-align: left; margin-bottom: 5px">
              <a-dropdown>
                <span>
                  {{ dropdown }}<img src="@/assets/weather/展开.png" alt="" />
                </span>
                <a-menu slot="overlay" @click="ondropdownClick">
                  <a-menu-item key="本月"> 本月 </a-menu-item>
                  <a-menu-item key="本周"> 本周 </a-menu-item>
                  <a-menu-item key="当天"> 当天 </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>

            <a-range-picker
              :value="dateRange"
              @change="onChange"
              @ok="onOk"
              show-time
              style="background: #2a497b; width: 355px"
            >
              <img slot="suffixIcon" src="@/assets/weather/Frame.png" alt="" />
            </a-range-picker>
          </div>
        </charts>
      </div>
    </transition>
  </div>
</template>

<script>
import charts from "@/components/charts";
import moment from "moment";
const weatherDatal = {
  晴: "qing",
  多云: "duoyun",
  阴: "yin",
  阵雨: "yu",
  雷阵雨: "yu",
  雨夹雪: "yuxue",
  小雨: "yu",
  中雨: "yu",
  大雨: "yu",
  暴雨: "yu",
  阵雨: "yu",
  大暴雨: "yu",
  特大暴雨: "yu",
  阵雪: "xue",
  小雪: "xue",
  中雪: "xue",
  大雪: "xue",
  暴雪: "xue",
  雾: "wu",
  冻雨: "yu",
  小到中雨: "yu",
  "中雨-大雨": "yu",
  "大雨-暴雨": "yu",
  "暴雨-大暴雨": "yu",
  "大暴雨-特大暴雨": "yu",
  "小雪-中雪": "xue",
  "中雪-大雪": "xue",
  "大雪-暴雪": "xue",
  和风: "feng",
};
export default {
  name: "environmental",
  components: {
    charts,
  },
  data() {
    return {
      option: [],
      webOption: {
        grid: {
          // show: true,
          // backgroundColor: "transparent",
          // opacity: 0.3,
          // borderWidth: "0",
          top: "150",
          // bottom: "0",
        },
        tooltip: {
          // trigger: "axis",
        },
        legend: {
          show: false,
        },
        xAxis: [
          // 星期
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: 100,
            zlevel: 100,
            axisLine: {
              show: false,
              lineStyle: {
                color: "white",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: ["{a|{value}}"].join("\n"),
              rich: {
                a: {
                  // color: 'white',
                  fontSize: 12,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 19,
            },
            data: [],
          },
          // 日期
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: 80,
            zlevel: 100,
            axisLine: {
              show: false,
              lineStyle: {
                color: "white",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: ["{a|{value}}"].join("\n"),
              rich: {
                a: {
                  // color: 'white',
                  fontSize: 12,
                },
              },
            },
            nameTextStyle: {},
            data: [],
          },

          // 天气图标
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: 10,
            zlevel: 100,
            axisLine: {
              show: false,
              lineStyle: {
                color: "white",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: function (value, index) {
                return "{b|" + value + "}\n{" + weatherDatal[value] + "|}";
              },
              rich: {
                qing: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata + '.png')
                    image: require("@/assets/weather/qing.png"),
                  },
                  height: 40,
                  width: 40,
                },
                duoyun: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[1] + '.png')
                    image: require("@/assets/weather/duoyun.png"),
                  },
                  height: 40,
                  width: 40,
                },
                yu: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/yu.png"),
                  },
                  height: 40,
                  width: 40,
                },
                feng: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/feng.png"),
                  },
                  height: 40,
                  width: 40,
                },
                wu: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/wu.png"),
                  },
                  height: 40,
                  width: 40,
                },
                xue: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/xue.png"),
                  },
                  height: 40,
                  width: 40,
                },
                yin: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/yin.png"),
                  },
                  height: 40,
                  width: 40,
                },
                yuxue: {
                  backgroundColor: {
                    // image: require('@/assets/weather/' + this.weatherdata[2] + '.png')
                    image: require("@/assets/weather/yuxue.png"),
                  },
                  height: 40,
                  width: 40,
                },
                b: {
                  // color: 'white',
                  fontSize: 12,
                  lineHeight: 30,
                  height: 20,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 19,
            },
            // data: this.weatherdata.weather
            data: [],
          },
          // 底部
          //风向
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: -150,
            axisLine: {
              show: false,
              lineStyle: {
                color: "white",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: ["{a|{value}}"].join("\n"),
              rich: {
                a: {
                  fontSize: 14,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 19,
            },
            // data: this.weatherdata.weather
            data: [],
          },
          //优良
          {
            type: "category",
            boundaryGap: false,
            position: "bottom",
            offset: -20,
            zlevel: 100,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: ["{a|{value}}"].join("\n"),
              rich: {
                a: {
                  fontSize: 14,
                  color: "white",
                  backgroundColor: "#34976e",
                  padding: [4, 15],
                  borderRadius: 10,
                },
              },
            },
            nameTextStyle: {},
            // data: this.weatherdata.weather
            data: ["优", "优", "优", "优"],
          },
        ],
        yAxis: {
          type: "value",
          show: false,
          axisLabel: {
            formatter: "{value} °C",
            color: "white",
          },
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [],
            symbol: "emptyCircle",
            // symbolSize: 10,
            showSymbol: true,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#FFD43A",
              },
            },
            label: {
              show: true,
              position: "top",
              color: "white",
              formatter: "{c}℃",
            },
            lineStyle: {
              width: 1,
              // color: 'white'
            },
            areaStyle: {
              opacity: 1,
              color: "transparent",
            },
          },
          {
            name: "最低气温",
            type: "line",
            data: [],
            symbol: "emptyCircle",
            // symbolSize: 10,
            showSymbol: true,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#2596FF",
              },
            },
            label: {
              show: true,
              position: "bottom",
              color: "white",
              formatter: "{c}℃",
            },
            lineStyle: {
              width: 1,
              // color: 'white'
            },
            areaStyle: {
              opacity: 1,
              color: "transparent",
            },
          },
        ],
      },
      statisticsOption: {
        grid: { top: "60%" },
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "50%",
          left: "20",
          data: ["PM2.5", "PM10"],
          textStyle: {
            color: "white",
          },
          // itemWidth: 10,
          // itemHeight: 10,
          icon: "circle",
          // borderRadius: [10], // 设置图例标记的圆角大小
        },
        dataset: {
          source: [],
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        yAxis: {
          splitLine: {
            // show: false,
            lineStyle: {
              type: "dashed",
              color: "#A9B1BC",
              opacity: 0.2,
            },
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        series: [
          {
            name: "温度统计",
            type: "pie",
            radius: "30%",
            selectedMode: "single",
            center: ["50%", "25%"],
            label: {
              color: "white",
              fontSize: 14,
              formatter: "{b}\n",

              // distanceToLabelLine: 0, //文字与 label line 之间的距离。
              // formatter: function (value) {
              //   let index =
              //     value.name.slice(0, 1) == "高"
              //       ? 0
              //       : value.name.slice(0, 1) == "常"
              //       ? 1
              //       : 2;
              //   return "\n{" + index + "|}\n {b|" + value.name + "}";
              // },
              // rich: {
              //   0: {
              //     width: 10,
              //     height: 10,
              //     borderRadius: 5,
              //     backgroundColor: "#5470c6",
              //   },
              //   1: {
              //     width: 10,
              //     height: 10,
              //     borderRadius: 5,
              //     backgroundColor: "#91cc75",
              //   },
              //   2: {
              //     width: 10,
              //     height: 10,
              //     borderRadius: 5,
              //     backgroundColor: "#fac858",
              //   },
              // },
            },
            labelLine: {
              show: true,
              showAbove: true,
              lineStyle: {
                // type: "dashed",
                cap: "round",
                color: "white", // 将引导线的颜色设置为透明
              },
            },
            labelLayout: function (params) {
              const isLeft = params.labelRect.x < 200;
              const points = params.labelLinePoints;
              // 更新结束点的横坐标
              points[2][0] = isLeft
                ? params.labelRect.x
                : params.labelRect.x + params.labelRect.width;
              return {
                labelLinePoints: points,
              };
            },
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },

          {
            name: "PM2.5",
            type: "bar",
            barWidth: 10,
            color: "#2596FF",
          },
          {
            name: "PM10",
            type: "bar",
            barWidth: 10,
            color: "#FFD43A",
          },
        ],
      },
      dropdown: "本月",
      dateRange: null,
      presetRanges: {
        当天: [moment(), moment()],
        本周: [moment().startOf("week"), moment()],
        本月: [moment().startOf("month"), moment()],
      },
      timer: "",
      timer1: "",
      isToggled: false,
      realtimeData: [], //环境实况数据
    };
  },
  created() {
    //环境实况
    this.environmentReality();
  },
  mounted() {
    this.weatherInfo({
      city: 450721,
      extensions: "all",
    });
    // 获取当前时间
    const currentTime = moment();
    // 往前8个小时
    const pastTime = moment().subtract(8, "hours");

    this.statisticsHour({
      startTime: moment(pastTime).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(currentTime).format("YYYY-MM-DD HH:mm:ss"),
    });
    this.timer = setInterval(() => {
      const currentTime = moment();
      const pastTime = moment().subtract(8, "hours");
      this.statisticsHour({
        startTime: moment(pastTime).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(currentTime).format("YYYY-MM-DD HH:mm:ss"),
      });
    }, 1000 * 60 * 30);
    this.timer1 = setInterval(() => {
      this.environmentReality();
    }, 1000 * 60);
    this.ondropdownClick({ key: "本月" });
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
  methods: {
    weatherInfo(params) {
      const chineseDays = [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周天",
      ];
      const casts = [
        {
          date: "2023-07-15",
          week: "6",
          dayweather: "多云",
          nightweather: "阵雨",
          daytemp: "35",
          nighttemp: "27",
          daywind: "北",
          nightwind: "北",
          daypower: "≤3",
          nightpower: "≤3",
          daytemp_float: "35.0",
          nighttemp_float: "27.0",
        },
        {
          date: "2023-07-16",
          week: "7",
          dayweather: "阵雨",
          nightweather: "多云",
          daytemp: "35",
          nighttemp: "27",
          daywind: "北",
          nightwind: "北",
          daypower: "≤3",
          nightpower: "≤3",
          daytemp_float: "35.0",
          nighttemp_float: "27.0",
        },
        {
          date: "2023-07-17",
          week: "1",
          dayweather: "阵雨",
          nightweather: "中雨",
          daytemp: "34",
          nighttemp: "26",
          daywind: "北",
          nightwind: "北",
          daypower: "5",
          nightpower: "5",
          daytemp_float: "34.0",
          nighttemp_float: "26.0",
        },
        {
          date: "2023-07-18",
          week: "2",
          dayweather: "大雨",
          nightweather: "阵雨",
          daytemp: "31",
          nighttemp: "25",
          daywind: "东北",
          nightwind: "东北",
          daypower: "4",
          nightpower: "4",
          daytemp_float: "31.0",
          nighttemp_float: "25.0",
        },
      ];
      console.log(casts, "--casts");
      const date = casts.map((cast) => moment(cast.date).format("MM/DD"));
      const week = casts.map((cast) => chineseDays[cast.week - 1]);
      const dayweather = casts.map((cast) => cast.dayweather);

      const daytemp_float = casts.map((cast) => cast.daytemp_float);
      const nighttemp_float = casts.map((cast) => cast.nighttemp_float);
      const daywind = casts.map((cast) => cast.daywind + "风");

      // this.weatherdata = dayweather;
      // console.log(dayweather, "--dayweather");
      this.webOption.xAxis.forEach((xAxis, index) => {
        if (index === 0) {
          xAxis.data = week;
        } else if (index === 1) {
          xAxis.data = date;
        } else if (index === 2) {
          xAxis.data = dayweather;
        } else if (index === 3) {
          xAxis.data = daywind;
        }
      });
      this.webOption.series[0].data = daytemp_float;
      this.webOption.series[1].data = nighttemp_float;
    },
    statisticsHour(params) {
      const list = {
        dateTime: [
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "16:00",
          "17:00",
        ],
        seriesData: [
          [32.1, 33, 33.9, 34.5, 35, 35.6, 35.6],
          [0.9, 0.9, 0.7, 1, 1.4, 1.2, 0.9],
          [0, 1, 0, 5, 0, 6, 0],
          [31.003, 31.007, 31.015, 31.008, 31.004, 31.004, 31.003],
          [30.6, 30.8, 31.1, 31.3, 31.6, 32.3, 32.5],
        ],
      };
      this.option = [];
      for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
          this.option.push({
            tooltip: {
              trigger: "axis",
            },
            grid: {
              top: "10",
              bottom: "40",
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: list.dateTime,
              axisLine: {
                lineStyle: {
                  color: "white",
                },
              },
            },
            yAxis: {
              type: "value",
              splitLine: {
                // show: false,
                lineStyle: {
                  type: "dashed",
                  color: "#A9B1BC",
                  opacity: 0.2,
                },
              },
              axisLine: {
                lineStyle: {
                  color: "white",
                },
              },
            },
            series: [
              {
                data: list.seriesData[i],
                type: "line",
                symbol: "none",
                smooth: true,
                lineStyle: {
                  color: "#25FFE5",
                },
                areaStyle: {
                  //   opacity: 0.3,
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#25FFE5", // 起始颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(37,255,229,0)", // 结束颜色
                      },
                    ],
                  },
                },
              },
            ],
          });
        } else {
          this.option.push({
            tooltip: {
              trigger: "axis",
            },
            grid: {
              top: "10",
              bottom: "40",
            },
            xAxis: {
              type: "category",
              data: list.dateTime,
              axisLine: {
                lineStyle: {
                  color: "white",
                },
              },
            },
            yAxis: {
              type: "value",
              splitLine: {
                lineStyle: {
                  type: "dashed",
                  color: "#A9B1BC",
                  opacity: 0.2,
                },
              },
              axisLine: {
                lineStyle: {
                  color: "white",
                },
              },
            },
            series: [
              {
                data: list.seriesData[i],
                type: "bar",
                showBackground: true,
                barWidth: 15,
                backgroundStyle: {
                  color: "#0A2747",
                  opacity: 0.7,
                },
                color: "#25FFE5",
              },
            ],
          });
        }
      }
    },
    weatherStatistics(params) {
      let TeamNum = [];
      let pmSource = [
        ["良"],
        ["优"],
        ["轻度污染"],
        ["中度污染"],
        ["重度污染"],
        ["严重污染"],
      ];
      const {
        highTempNum,
        lowTempNum,
        normalTempNum,
        pm10L1,
        pm10L2,
        pm10L3,
        pm10L4,
        pm10L5,
        pm10L6,
        pm25L1,
        pm25L2,
        pm25L3,
        pm25L4,
        pm25L5,
        pm25L6,
      } = {
        pm25L1: 4,
        pm25L2: 0,
        pm25L3: 0,
        pm25L4: 0,
        pm25L5: 0,
        pm25L6: 0,
        pm10L1: 4,
        pm10L2: 0,
        pm10L3: 0,
        pm10L4: 0,
        pm10L5: 0,
        pm10L6: 0,
        highTempNum: 4,
        normalTempNum: 0,
        lowTempNum: 0,
      };
      TeamNum.push(
        {
          value: highTempNum,
          name: "高温30°C以上",
          itemStyle: { color: "#25ffe5" },
        },
        {
          value: lowTempNum,
          name: "常温度15°C-30°C",
          itemStyle: { color: "#FF6E9A" },
        },
        {
          value: normalTempNum,
          name: "低温15°C以下",
          itemStyle: { color: "#2596FF" },
        }
      );
      pmSource[0].push(pm10L1, pm25L1);
      pmSource[1].push(pm10L2, pm25L2);
      pmSource[2].push(pm10L3, pm25L3);
      pmSource[3].push(pm10L4, pm25L4);
      pmSource[4].push(pm10L5, pm25L5);
      pmSource[5].push(pm10L6, pm25L6);

      this.statisticsOption.dataset.source = pmSource;
      this.statisticsOption.series[0].data = TeamNum;
    },
    //环境实况
    environmentReality() {
      this.realtimeData = [
        {
          sensor: "a01007",
          data: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          flag: "N",
          name: "风速",
        },
        {
          sensor: "f01001",
          data: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          flag: "N",
          name: "风力",
        },
        {
          sensor: "a01001",
          data: 35.7,
          flag: "N",
          name: "温度",
        },
        {
          sensor: "c01015",
          data: 0,
          flag: "N",
          name: "雨量",
        },
        {
          sensor: "as2104",
          data: 31.008,
          flag: "N",
          name: "水位",
        },
        {
          sensor: "w01010",
          data: 32.6,
          flag: "N",
          name: "水温",
        },
      ];
    },
    onChange(date, dateString) {
      this.dateRange = date;
      console.log(date, dateString);
    },
    onOk(value) {
      this.weatherStatistics({
        startTime: moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
      });
    },
    ondropdownClick({ key }) {
      console.log(key);
      this.dropdown = key;
      this.dateRange = this.presetRanges[key];
      this.weatherStatistics({
        startTime: moment(this.dateRange[0]).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(this.dateRange[1]).format("YYYY-MM-DD HH:mm:ss"),
      });
    },
  },
};
</script>

<style lang="less" scoped>
.environmental {
  height: 100%;
  position: relative;
  .aside {
    background: #122848;
    border: 1px solid #2596ff;
    opacity: 0.8;
    width: 419px;
    height: 95%;
    padding: 15px 0px;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
  }
  .left {
    .reality {
      display: flex;
      padding: 0;
      justify-content: space-around;
      color: white;
      font-size: 12px;
      // widows: 100%;
      li {
        text-align: center;
        list-style: none;
        // color: #93A0A4;
        .re-num {
          font-size: 24px;
          font-weight: 400;
          color: #25ffe5;
          i {
            font-size: 12px;
            font-style: normal;
          }
        }
      }
    }
  }
  .right {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      height: 28px;
      line-height: 28px;
      color: white;
      margin: 0 16px;
      border: 1px solid #2596ff;
    }
    .statistics {
      padding: 20px 16px 0 16px;
      color: white;
    }
    /deep/ .ant-input {
      background: #2a497b;
      border: 1px solid #2596ff;
      color: white;
      .ant-calendar-picker-clear {
        background: #2a497b;
        color: #fff;
      }
    }
  }
}

.toggle_icon {
  position: absolute;
  top: 20px;
  left: 445px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  color: #fff;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("~@/assets/zoomin.png");
  &.toggled {
    left: 60px;
    background-image: url("~@/assets/zoomout.png");
  }
}
.cc-enter-active,
.cc-leave-active {
  /* 进入 / 离开 过度生效状态 */
  transition: all 0.5s;
}

.cc-enter,
.cc-leave-to {
  /* 进入状态 & 结束状态 opacity为0 */
  transform: translateX(-100%);
}

.cc1-enter-active,
.cc1-leave-active {
  /* 进入 / 离开 过度生效状态 */
  transition: all 0.5s;
}

.cc1-enter,
.cc1-leave-to {
  /* 进入状态 & 结束状态 opacity为0 */
  transform: translateX(100%);
}
</style>
