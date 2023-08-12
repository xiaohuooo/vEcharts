<template>
  <div class="bicontent">
    <transition name="cc" v-if="!isToggled">
      <div class="left aside" style="left: 46px">
        <charts height="40%" title="实时数据">
          <div class="realTime">
            <div>
              <ul class="reality">
                <li>
                  <img src="@/assets/concrete/shidu.png" alt="" />
                  <div style="display: inline-block">
                    <span class="re-num">
                      <span class="elliptical">11</span>
                      <i>℃</i>
                    </span>
                    <br />
                    <span>气温</span>
                  </div>
                </li>
                <li>
                  <img src="@/assets/concrete/fengsu.png" alt="" />
                  <div style="display: inline-block">
                    <span class="re-num">
                      <span class="elliptical">22</span>
                      <i>m/s</i>
                    </span>
                    <br />
                    <span>风力</span>
                  </div>
                </li>
                <li>
                  <img src="@/assets/concrete/fengxiang.png" alt="" />
                  <div style="display: inline-block">
                    <span class="re-num">
                      <span class="elliptical">33</span>

                      <i>mm</i></span
                    >
                    <br />
                    <span>雨量</span>
                  </div>
                </li>
                <li>
                  <img src="@/assets/concrete/wendu.png" alt="" />
                  <div style="display: inline-block">
                    <span class="re-num">
                      <span class="elliptical">44</span>
                      <i>m</i></span
                    >
                    <br />
                    <span>水位</span>
                  </div>
                </li>
              </ul>
              <wrap :showToggle="false" title="混凝土养护数据" class="conserve">
                <div class="content_wrap" slot="content">
                  <div class="transparent_table">
                    <div class="table_header">
                      <div
                        :style="{ width: 100 / onLineListHeader.length + '%' }"
                        class="table_header_one"
                        v-for="(item, index) in onLineListHeader"
                        :key="index"
                      >
                        {{ item.tableName }}
                      </div>
                    </div>
                    <div class="table_body">
                      <div
                        class="table_tr"
                        v-for="(el, index) in onLineList"
                        :key="index"
                      >
                        <div
                          :style="{
                            width: 100 / onLineListHeader.length + '%',
                          }"
                          class="table_body_one"
                          v-for="item in onLineListHeader"
                          :key="item.prop"
                        >
                          {{ el[item.prop] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </wrap>
            </div>

            <ul class="bigReality">
              <li>
                <img src="@/assets/concrete/wendu1.png" alt="" />
                <div>
                  <span class="re-num">
                    <span class="elliptical">11</span>
                    <i>℃</i>
                  </span>
                  <br />
                  <span>最高温度</span>
                </div>
              </li>
              <li>
                <img src="@/assets/concrete/wencha.png" alt="" />
                <div>
                  <span class="re-num">
                    <span class="elliptical">11</span>
                    <i>℃</i>
                  </span>
                  <br />
                  <span>内表温差</span>
                </div>
              </li>
              <li>
                <img src="@/assets/concrete/wencha1.png" alt="" />
                <div>
                  <span class="re-num">
                    <span class="elliptical">11</span>
                    <i>℃</i>
                  </span>
                  <br />
                  <span>表环温差</span>
                </div>
              </li>
              <li>
                <img src="@/assets/concrete/shidu1.png" alt="" />
                <div>
                  <span class="re-num">
                    <span class="elliptical">11</span>
                    <i>%</i>
                  </span>
                  <br />
                  <span>养护湿度</span>
                </div>
              </li>
            </ul>
          </div>
        </charts>
        <charts
          :option="option2"
          height="25%"
          title="当前断面平均降温速率曲线"
        ></charts>
        <charts :option="option" height="25%" title="进出水温及流量"></charts>
      </div>
    </transition>
    <span
      @click="isToggled = !isToggled"
      class="toggle_icon"
      :class="{ toggled: isToggled }"
    ></span>
    <transition name="cc1" v-if="!isToggled">
      <div class="right aside" style="right: 46px">
        <charts :option="option1" height="30%" title="预警信息">
          <div class="pieRight">
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
            <p>
              <span style="margin-right: 16px">[06-08 08:06:32]</span>
              <span>温控设备开机运行</span>
            </p>
          </div>
        </charts>
        <wrap
          style="height: 30%; width: 100%"
          :showToggle="false"
          title="常规温控报告"
        >
          <div class="content_wrap" slot="content">
            <div class="transparent_table">
              <div class="table_header">
                <div
                  :style="{ width: 100 / temListHeader.length + '%' }"
                  class="table_header_one"
                  v-for="(item, index) in temListHeader"
                  :key="index"
                >
                  {{ item.tableName }}
                </div>
              </div>
              <div class="table_body">
                <div
                  class="table_tr"
                  v-for="(el, index) in temList"
                  :key="index"
                >
                  <div
                    :style="{ width: 100 / temListHeader.length + '%' }"
                    class="table_body_one"
                    v-for="item in temListHeader"
                    :key="item.prop"
                  >
                    {{ el[item.prop] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </wrap>

        <charts
          :option="option3"
          height="27%"
          title="混凝土温度特征值历史曲线"
        ></charts>
      </div>
    </transition>
  </div>
</template>

<script>
import charts from "@/components/charts";
import wrap from "@/components/wrap";
export default {
  name: "concrete",
  components: {
    charts,
    wrap,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          bottom: 40,
        },
        legend: {
          left: "left",
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            data: ["1", "2", "3", "4", "5", "6", "7", "8"],
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "m³/s",
            position: "right",
            alignTicks: true,
            axisLine: {
              //   show: true,
              lineStyle: {
                color: "white",
              },
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#A9B1BC",
                opacity: 0.2,
              },
            },
          },
          {
            type: "value",
            name: "℃",
            position: "left",
            alignTicks: true,
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
            splitLine: {
              // show: false,
              lineStyle: {
                type: "dashed",
                color: "#A9B1BC",
                opacity: 0.2,
              },
            },
          },
        ],
        series: [
          {
            name: "进水速度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#0F8CFF",
            },
            areaStyle: {
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
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 3.6],
          },
          {
            name: "出水速度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#0EE94B",
            },
            areaStyle: {
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
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 4],
          },
          {
            name: "流量",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#FFD43A",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFD43A", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,212,58,0)", // 渐变终点颜色
                  },
                ],
              },
            },
            data: [10.0, 32.2, 20.3, 30.5, 50.3, 80.2, 10.3, 30.4, 40],
          },
        ],
      }, //进出水
      option1: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "10%",
          left: "6%",
          icon: "circle",
          //   orient: "vertical",
          textStyle: {
            rich: {
              // 通过富文本rich给每个项设置样式，下面的oneone、twotwo、threethree可以理解为"每一列"的样式
              oneone: {
                // 设置文字、数学、英语这一列的样式
                color: "#FFFFFF",
                fontSize: 14,
                width: 50,
              },
              a: {
                // 设置10分、20分、30分这一列的样式
                color: "#0882F4",
                fontSize: 14,
              },
              b: {
                color: "#FFD43A",
                fontSize: 14,
              },
            },
          },
          formatter: (name) => {
            let index = name == "已完成" ? "a" : "b";
            return `{oneone|${name}} {${index}|3天}`;
          },
        },
        series: [
          {
            name: "预警",
            type: "pie",
            radius: ["45%", "60%"],
            center: ["25%", "30%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              position: "center",
              show: true,
              formatter: () => {
                let data = 11;
                let str = "{b|" + data + "}\n总预警";
                return str;
              },
              rich: {
                b: {
                  fontSize: "24px",
                  height: 30,
                },
              },
              color: "#fff",
              fontSize: 12,
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
                    color: "#0783FA", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(7,131,250,0.2)", // 渐变终点颜色
                  },
                ],
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
                    color: "#FFD43A", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(180,162,0,0.2)", // 渐变终点颜色
                  },
                ],
                global: false, // 是否支持全局渐变色
              },
            ],
            labelLine: {
              show: false,
            },
            data: [
              { value: 735, name: "已完成" },
              { value: 580, name: "未处理" },
            ],
          },
        ],
      }, //预警信息
      option2: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "10",
          bottom: "40",
        },
        xAxis: {
          type: "category",
          data: [
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
          ],
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
            name: "气温",
            data: [28.5, 28, 27.8, 27.7, 27.6, 27.4, 27.8, 29.1],
            type: "line",
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              color: "#0783FA",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0085FF",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,133,255,0)",
                  },
                ],
              },
            },
          },
        ],
      }, //当前断面
      option3: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "left",
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
          },
        ],
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
            name: "环境温度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#0F8CFF",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0E8FF3", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(14,143,243,0)", // 渐变终点颜色
                  },
                ],
              },
            },

            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "最高温度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#03A92C",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0FD582", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(15,213,130,0)", // 渐变终点颜色
                  },
                ],
              },
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "表面温度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#FFD43A",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#FFD43A", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,212,58,0)", // 渐变终点颜色
                  },
                ],
              },
            },
            data: [120, 282, 491, 534, 290, 380, 310],
          },
          {
            name: "内标温度",
            type: "line",
            symbol: "circle",
            itemStyle: {
              color: "#03A98B",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#03A98B", // 渐变起点颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(3,169,139,0)", // 渐变终点颜色
                  },
                ],
              },
            },
            data: [200, 102, 150, 244, 210, 430, 380],
          },
        ],
      }, //混凝土
      onLineListHeader: [
        {
          tableName: "养护参数",
          prop: "type",
        },
        {
          tableName: "参数值",
          prop: "num",
        },
      ],
      onLineList: [
        {
          type: "视频监控",
          num: 39,
        },
        {
          type: "挖机",
          num: 48,
        },
        {
          type: "自卸车",
          num: 189,
        },
        {
          type: "11",
          num: 189,
        },
        {
          type: "bb",
          num: 189,
        },
      ],
      temListHeader: [
        {
          tableName: "参数",
          prop: "type",
        },
        {
          tableName: "实际",
          prop: "num",
        },
        {
          tableName: "设计要求",
          prop: "design",
        },
      ],
      temList: [
        {
          type: "视频监控",
          num: 39,
          design: "<28℃",
        },
        {
          type: "视频监控",
          num: 39,
          design: "<28℃",
        },
        {
          type: "视频监控",
          num: 39,
          design: "<28℃",
        },
        {
          type: "视频监控",
          num: 39,
          design: "<28℃",
        },
        {
          type: "视频监控",
          num: 39,
          design: "<28℃",
        },
      ],
      isToggled: false,
    };
  },
};
</script>

<style lang="less" scoped>
.bicontent {
  height: 100%;
  position: relative;
  .aside {
    width: 525px;
    height: 96%;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    /deep/ .title {
      background-image: url("~@/assets/weather/titbgl.png");
    }
    /deep/ .conserve .title{
      background-image: url("~@/assets/weather/titbg.png");
    }
  }
  .realTime {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .reality {
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: space-around;
      color: white;
      width: 350px;
      height: 45px;
      li {
        text-align: center;
        list-style: none;
        color: #ffffff;
        font-size: 12px;
        img {
          vertical-align: initial;
          width: 36px;
        }
        .re-num {
          font-size: 18px;
          color: #2484e3;
          i {
            font-size: 11px;
            font-style: normal;
          }
        }
      }
    }
    .bigReality {
      padding: 0;
      margin: 0;
      li {
        display: flex;
        justify-content: space-around;
        //   list-style: none;
        margin-bottom: 20px;
        align-items: center;
        color: #ffffff;
        font-size: 12px;
        width: 145px;
        height: 60px;
        background: rgba(10, 35, 75, 0.6);
        .re-num {
          font-size: 18px;
          color: #2484e3;
          i {
            font-size: 11px;
            font-style: normal;
          }
        }
      }
    }
    .conserve {
      width: 100%;
      margin-top: 25px;
    }
  }

  .transparent_table {
    font-size: 12px;
    color: #fff;
    background: rgba(27, 52, 91, 0.6);
    padding: 8px;
    .table_header {
      display: flex;
      flex-direction: row;
      font-weight: 500;
      height: 28px;
      background: rgba(21, 116, 210, 0.6);
      line-height: 28px;
      .table_header_one {
      }
    }
    .table_body {
      display: flex;
      flex-direction: column;
      .table_tr {
        display: flex;
        flex-direction: row;
        height: 28px;
        line-height: 28px;
        &:nth-child(2n) {
          background: rgba(27, 52, 91, 0.6);
        }
        .table_body_one {
        }
      }
    }
  }
  .pieRight {
    position: absolute;
    right: 0;
    color: #fff;
    font-size: 12px;
    p {
      width: 246px;
      height: 28px;
      line-height: 28px;
      margin-bottom: 8px;
      background: linear-gradient(86deg, #1f395e 0%, rgba(32, 57, 94, 0) 100%);
    }
  }
  .toggle_icon {
    position: absolute;
    top: 20px;
    left: 600px;
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
}
</style>
