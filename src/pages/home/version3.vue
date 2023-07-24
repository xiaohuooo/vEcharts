<template>
  <div class="bicontent">
    <!-- <charts :option="option" height="40%" title="当前气温"></charts> -->
    <div class="left aside" style="left: 0">
      <charts height="40%" title="实时数据">
        <ul class="reality">
          <li>
            <img src="@/assets/weather/qiwen.png" alt="" />
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
            <img src="@/assets/weather/fengli.png" alt="" />
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
            <img src="@/assets/weather/yuliang.png" alt="" />
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
            <img src="@/assets/weather/shuiwei.png" alt="" />
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
        <ul class="bigReality">
          <li>
            <img src="@/assets/weather/qiwen.png" alt="" />
            <div>
              <span class="re-num">
                <span class="elliptical">11</span>
                <i>℃</i>
              </span>
              <br />
              <span>气温</span>
            </div>
          </li>
          <li>
            <img src="@/assets/weather/qiwen.png" alt="" />
            <div>
              <span class="re-num">
                <span class="elliptical">11</span>
                <i>℃</i>
              </span>
              <br />
              <span>气温</span>
            </div>
          </li>
          <li>
            <img src="@/assets/weather/qiwen.png" alt="" />
            <div>
              <span class="re-num">
                <span class="elliptical">11</span>
                <i>℃</i>
              </span>
              <br />
              <span>气温</span>
            </div>
          </li>
          <li>
            <img src="@/assets/weather/qiwen.png" alt="" />
            <div>
              <span class="re-num">
                <span class="elliptical">11</span>
                <i>℃</i>
              </span>
              <br />
              <span>气温</span>
            </div>
          </li>
        </ul>
      </charts>
      <wrap :showToggle="false" title="混凝土养护数据">
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
                  :style="{ width: 100 / onLineListHeader.length + '%' }"
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
    <div class="right aside" style="right: 0">
      <charts :option="option1" height="40%" title="预警信息">
        <div class="pieRight">
          <p>温控设备开机运行</p>
          <p>温控设备开机运行</p>
          <p>温控设备开机运行</p>
          <p>温控设备开机运行</p>
        </div>
      </charts>
      <wrap :showToggle="false" title="常规温控报告">
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
                  :style="{ width: 100 / onLineListHeader.length + '%' }"
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
    <div class="bottom">
      <charts
        :option="option"
        width="360px"
        height="90%"
        title="进出水温及流量"
      ></charts>
      <charts
        :option="option"
        width="360px"
        height="95%"
        title="混凝土温度特征值历史曲线"
      ></charts>
      <charts
        :option="option"
        width="360px"
        height="95%"
        title="当前断面平均降温速率曲线"
      ></charts>
    </div>
  </div>
</template>

<script>
import charts from "@/components/charts/";
import wrap from "@/components/wrap";
export default {
  name: "Bi",
  components: {
    charts,
    wrap,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          bottom: 20,
        },
        legend: {
          data: ["Evaporation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            // axisTick: {
            //   alignWithLabel: true
            // },
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Evaporation",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#5470C6",
              },
            },
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
          {
            type: "value",
            name: "温度",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#91CC75",
              },
            },
            // axisLabel: {
            //   formatter: "{value} °C",
            // },
          },
        ],
        series: [
          {
            name: "Evaporation",
            type: "line",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
      option1: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "10%",
          left: "10%",
          icon: "circle",
          //   data: ["低温15°C以上", "常温度15°C-30°C", "高温30°C以上"],
          orient: "vertical",
          textStyle: {
            rich: {
              // 通过富文本rich给每个项设置样式，下面的oneone、twotwo、threethree可以理解为"每一列"的样式
              oneone: {
                // 设置文字、数学、英语这一列的样式
                color: "#FFFFFF",
                fontSize: 14,
                width: 50,
              },
              twotwo: {
                // 设置10分、20分、30分这一列的样式
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
              },
            },
          },
          formatter: (name) => {
            return `{oneone|${name}} {twotwo|3天}`;
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["20%", "30%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            label: {
              position: "center",
              show: true,
              formatter: () => {
                let str = `111` + "\n" + "总预警";
                return str;
              },
              color: "#1E7CE8",
              lineHeight: 16,
              fontSize: 12,
            },

            labelLine: {
              show: false,
            },
            data: [
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
            ],
          },
        ],
      },
      onLineListHeader: [
        {
          tableName: "设备类型",
          prop: "type",
        },
        {
          tableName: "在线数量",
          prop: "num",
        },
        {
          tableName: "总数量",
          prop: "totalnum",
        },
      ],
      onLineList: [
        {
          type: "视频监控",
          num: 39,
          totalnum: 100,
        },
        {
          type: "挖机",
          num: 48,
          totalnum: 55,
        },
        {
          type: "自卸车",
          num: 189,
          totalnum: 200,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.bicontent {
  height: calc(100% - 100px);
  position: relative;
  .aside {
    width: 360px;
    background: #122848;
    height: 60%;
    top: 0;
    position: absolute;
  }
  .reality {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: space-around;
    color: white;
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
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    li {
      display: flex;
      justify-content: space-around;
      list-style: none;
      align-items: center;
      color: #ffffff;
      font-size: 12px;
      width: 172px;
      height: 60px;
      background: #0a234b;
      img {
        vertical-align: initial;
        width: 48px;
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
  .transparent_table {
    font-size: 12px;
    color: #fff;
    background: #0a234b;
    padding: 10px;
    .table_header {
      display: flex;
      flex-direction: row;
      font-weight: 500;
      height: 28px;
      background: #1574d2;
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
          background: #1b345b;
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
    .p {
      background: #1574d2;
    }
  }
  .bottom {
    position: absolute;
    background: #122848;
    width: 100%;
    height: 26%;
    bottom: 140px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
