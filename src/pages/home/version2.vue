<template>
  <div class="environmental">
    <transition name="cc" v-if="!isToggled">
      <div class="left aside" style="left: 20px">
        <charts height="12%" title="环境实况">
          <ul class="reality">
            <li>
              <img src="@/assets/weather/wendu.png" alt="" />
              <span class="re-num">{{ realtimeData[2]?.data }}<i>℃</i></span>
              <br />
              <span>温度</span>
            </li>
            <li>
              <img src="@/assets/weather/fengli.png" alt="" />
              <span class="re-num">{{ realtimeData[0]?.data }}<i>m/s</i> </span>
              <br />
              <span>风力</span>
            </li>
            <li>
              <img src="@/assets/weather/yuliang.png" alt="" />
              <span class="re-num">{{ realtimeData[3]?.data }}<i>mm</i></span>
              <br />
              <span>雨量</span>
            </li>
            <li>
              <img src="@/assets/weather/shuiwei.png" alt="" />
              <span class="re-num">{{ realtimeData[4]?.data }}<i>m</i></span>
              <br />
              <span>水位</span>
            </li>
          </ul>
        </charts>
        <charts :option="option[0]" height="22%" title="当前气温"></charts>
        <charts :option="option[1]" height="22%" title="当前风力"></charts>
        <charts :option="option[2]" height="22%" title="当前雨量"></charts>
        <charts :option="option[3]" height="22%" title="当前水位"></charts>
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
          <div class="statistics">
            <div style="text-align: left; margin-bottom: 5px">
              <a-dropdown>
                <span>
                  {{ dropdown }}<img src="@/assets/weather/展开.png" alt="" />
                </span>
                <a-menu slot="overlay">
                  <a-menu-item key="本月"> 本月 </a-menu-item>
                  <a-menu-item key="本周"> 本周 </a-menu-item>
                  <a-menu-item key="当天"> 当天 </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
            <div class="top">
              近七天天气情况
              <img src="@/assets/weather/Frame.png" alt="" />
            </div>
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
import charts from "@/components/charts/";
import {
  weatherInfo,
  statisticsHour,
  weatherStatistics,
  environmentReality,
} from "@/api/interface/api";
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
            offset: -120,
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
          // {
          //   type: "category",
          //   boundaryGap: false,
          //   position: "bottom",
          //   offset: -10,
          //   axisLine: {
          //     show: false,
          //   },
          //   axisTick: {
          //     show: false,
          //   },
          //   axisLabel: {
          //     interval: 0,
          //     formatter: ["{a|{value}}"].join("\n"),
          //     rich: {
          //       a: {
          //         fontSize: 14,
          //         color: "white",
          //         backgroundColor: "#34976e",
          //         padding: [4, 15],
          //         borderRadius: 10,
          //       },
          //     },
          //   },
          //   nameTextStyle: {},
          //   // data: this.weatherdata.weather
          //   data: ["优", "优", "优", "优"],
          // },
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
            symbol: "circle",
            symbolSize: 5,
            smooth: true,
            itemStyle: {
              color: "#FFD43A",
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
            symbol: "circle",
            symbolSize: 5,
            smooth: true,
            itemStyle: {
              color: "#2596FF",
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
        grid: { top: "55%" },
        tooltip: {
          trigger: "item",
        },
        legend: [
          {
            top: "10%",
            right: "10%",
            icon: "circle",
            data: ["低温15°C以上", "常温度15°C-30°C", "高温30°C以上"],
            orient: "vertical",
            textStyle: {
              rich: {
                // 通过富文本rich给每个项设置样式，下面的oneone、twotwo、threethree可以理解为"每一列"的样式
                oneone: {
                  // 设置文字、数学、英语这一列的样式
                  color: "#FFFFFF",
                  fontSize: 14,
                  width: 130,
                },
                twotwo: {
                  // 设置10分、20分、30分这一列的样式
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                },
              },
            },
            formatter: (name) => {
              // formatter格式化函数动态呈现数据
              let target; // 遍历拿到数据
              let list = this.statisticsOption.series[0].data;
              for (var i = 0; i < list.length; i++) {
                if (list[i].name == name) {
                  target = list[i].value;
                }
              }
              return `{oneone|${name}} {twotwo|${target}天}`;
            },
          },
          {
            bottom: "50%",
            left: "20",
            data: ["PM2.5", "PM10"],
            textStyle: {
              color: "#fff",
            },
            // ... 饼图的 legend 配置
          },
        ],

        // graphic: [
        //   {
        //     type: "text",
        //     left: "16%",
        //     top: "15%",
        //     style: {
        //       fill: "white",
        //       text: "",
        //       fontWeight: "bold",
        //       fontSize: "24px",
        //       // textAlign: "center",
        //       // textVerticalAlign: "middle",
        //     },
        //   },
        // ],
        dataset: {
          source: [],
        },
        xAxis: {
          type: "category",
          boundaryGap: false, //坐标轴两边留白策略
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
            // radius: "30%",
            radius: ["24%", "30%"],
            selectedMode: "single",
            center: ["20%", "20%"],
            label: {
              position: "center",
              color: "white",
              fontSize: 14,
              formatter: () => {
                let date =
                  this.dateRange[1].diff(this.dateRange[0], "days") + 1;
                return "{b|" + date + "}\n天";
              },
              rich: {
                b: {
                  fontSize: "24px",
                },
              },
            },
            labelLine: {
              show: true,
              // showAbove: true,
              lineStyle: {
                // type: "dashed",
                cap: "round",
                color: "white", // 将引导线的颜色设置为透明
              },
            },
            color: [
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FF7D00", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,125,0,0.2)", // 渐变终点颜色
                  },
                ],
                global: false, // 是否支持全局渐变色
              },

              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#00B42A", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0,180,42,0.2)", // 渐变终点颜色
                  },
                ],
              },
              {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0783FA", // 起始颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(7,131,250,0.2)", // 结束颜色
                  },
                ],
              },
            ],
            data: [
              {
                value: 3,
                name: "高温30°C以上",
                itemStyle: { color: "#25ffe5" },
              },
              {
                value: 2,
                name: "常温度15°C-30°C",
                itemStyle: { color: "#FF6E9A" },
              },
              {
                value: 1,
                name: "低温15°C以上",
                itemStyle: { color: "#2596FF" },
              },
            ],
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
            type: "line",
            seriesLayoutBy: "row",
            areaStyle: {},
            symbol: "circle",
            symbolSize: 5,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#0F8CFF", // 渐变起点颜色
                },
                {
                  offset: 1,
                  color: "rgba(15,140,255,0)", // 渐变终点颜色
                },
              ],
            },
          },
          {
            name: "PM10",
            type: "line",
            seriesLayoutBy: "row",
            areaStyle: {},
            symbol: "circle",
            symbolSize: 5,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#0EE94B", // 渐变起点颜色
                },
                {
                  offset: 1,
                  color: "rgba(14,233,75,0)", // 渐变终点颜色
                },
              ],
            },
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
      realtimeData: [
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
      ], //环境实况数据
    };
  },
  created() {
    //环境实况
    // this.environmentReality();
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
    // this.timer1 = setInterval(() => {
    //   this.environmentReality();
    // }, 1000 * 60);
    this.ondropdownClick({ key: "本月" });
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  },
  methods: {
    async weatherInfo(params) {
      const res = await weatherInfo(params);
      const chineseDays = [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周天",
      ];
      const { casts } = res.forecasts[0];
      console.log(casts, "--casts");
      const date = casts.map((cast) => moment(cast.date).format("MM/DD"));
      const week = casts.map((cast) => chineseDays[cast.week - 1]);
      const dayweather = casts.map((cast) => cast.dayweather);

      const daytemp_float = casts.map((cast) => cast.daytemp_float);
      const nighttemp_float = casts.map((cast) => cast.nighttemp_float);
      const daywind = casts.map((cast) => cast.daywind + "风");
      console.log(
        { date, week, dayweather, daytemp_float, nighttemp_float, daywind },
        "--casts"
      );

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
      statisticsHour(params).then((res) => {
        if (res.code == "1001") {
          console.log(res.content, "--res.content");
          const list = this.processData(res.content);
          this.option = [];
          for (let i = 0; i < 4; i++) {
            if (i % 2 == 0) {
              if (i == 2) {
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
                    // boundaryGap: false,
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
                      data: [13, 60, 25, 18, 12, 9, 2, 1], //list.seriesData[i],[13, 60, 25, 18, 12, 9, 2, 1]
                      type: "pictorialBar",
                      barCategoryGap: "-80%",
                      // symbol: "none",
                      // smooth: true,
                      symbol:
                        "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                      itemStyle: {
                        color: "#42C7FF",
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
                    // boundaryGap: false,
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
                      // symbol: "none",
                      // smooth: true,
                      symbol: "circle",
                      symbolSize: 5,
                      itemStyle: {
                        color: "#0783FA", // 符号的颜色
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
                              color: "#0085FF", // 起始颜色
                            },
                            {
                              offset: 1,
                              color: "rgba(0,133,255,0)", // 结束颜色
                            },
                          ],
                        },
                      },
                    },
                  ],
                });
              }
            } else {
              if (i == 1) {
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
                      barWidth: 15,
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#0085FF", // 起始颜色
                          },
                          {
                            offset: 1,
                            color: "#51E0FF", // 结束颜色
                          },
                        ],
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
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "rgba(0,85,255,0)", // 起始颜色
                          },
                          {
                            offset: 1,
                            color: "#0783FA", // 结束颜色
                          },
                        ],
                      },
                    },
                    {
                      color: "#15b1ff",
                      type: "pictorialBar",
                      symbol: "rect",
                      symbolSize: ["15", "4"],
                      symbolPosition: "end", // 图形边缘与柱子结束的地方内切。
                      symbolOffset: [0, -2], // 椭圆水平偏移,垂直偏移. 因为不一定正好盖住柱形,所以可能要移动一点点
                      data: list.seriesData[i],
                      z: 3, // 数值越大,层级越高,可以盖住下面的图形
                    },
                  ],
                });
              }
            }
          }
        }
      });
    },
    weatherStatistics(params) {
      let TeamNum = [];
      let pmSource = [
        ["product", "良", "优", "轻度", "中度", "重度", "严重"],
        ["PM2.5"],
        ["PM10"],
      ];
      weatherStatistics(params).then((res) => {
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
        } = res.result;
        TeamNum.push(
          {
            value: highTempNum,
            name: "高温30°C以上",
          },
          {
            value: lowTempNum,
            name: "常温度15°C-30°C",
          },
          {
            value: normalTempNum,
            name: "低温15°C以上",
          }
        );
        pmSource[1].push(pm25L1, pm25L2, pm25L3, pm25L4, pm25L5, pm25L6);
        pmSource[2].push(pm10L1, pm10L2, pm10L3, pm10L4, pm10L5, pm10L6);
      });
      this.statisticsOption.dataset.source = pmSource;
      this.statisticsOption.series[0].data = TeamNum;
    },
    //环境实况
    // environmentReality() {
    //   environmentReality().then((res) => {
    //     console.log(res, "--环境实况");
    //     this.realtimeData = res.content.realtimeData;
    //   });
    // },
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
    processData(data) {
      const res = {
        dateTime: [],
        seriesData: [[], [], [], [], []],
      };

      const sensorNameMap = new Map([
        ["温度", 0],
        ["风速", 1],
        ["雨量", 2],
        ["水位", 3],
        ["水温", 4],
      ]);

      data.forEach((item) => {
        res.dateTime.push(moment(item.dateTime).format("HH:mm"));
        item.list.forEach((sensor) => {
          const index = sensorNameMap.get(sensor.name);
          if (index !== undefined) {
            res.seriesData[index].push(sensor.data);
          }
        });
      });

      return res;
    },
    ondropdownClick({ key }) {
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
    padding: 25px 0px;
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
      font-size: 18px;
      li {
        text-align: center;
        list-style: none;
        color: #ffffff;
        font-size: 12px;
        .re-num {
          font-size: 20px;
          color: #2484e3;
          i {
            font-size: 11px;
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
      padding: 0px 16px 0 16px;
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
