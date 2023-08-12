<template>
  <div class="workbench">
    <div class="content">
      <div class="left">
        <div class="overallsituation boxall"></div>
        <div class="completesituation boxall">
          <div class="title">项目整体完成情况</div>
          <charts :option="configBar" theme="my_theme"></charts>
          <div class="boxfoot"></div>
        </div>
        <div class="savevision"></div>
      </div>
      <div class="mid">
        <div class="main"></div>
        <div class="processvision"></div>
      </div>
      <div class="right">
        <div class="subcontractsituation boxall">
          <div class="title">项目分包合同情况</div>
          <charts :option="configPie" theme="my_theme"></charts>
          <div class="boxfoot"></div>
        </div>
        <div class="measurevision"></div>
      </div>
    </div>
  </div>
</template>

<script>
import charts from "@/components/charts";
import json1 from "./json1.json";
import json2 from "./json2.json";
import myTheme from "@/config/theme.js";
import * as echarts from "echarts";

echarts.registerTheme("my_theme", myTheme);
let startValue = 0;
let endValue = json1.rtnObj.data.length - 2;
if (endValue - 9 > 0) {
  startValue = endValue - 9;
}
let legendData = [];
let seriesData = [];
let list = json2.data;
for (var i = 0; i < list.length; i++) {
  var amt = Number(list[i].amt / 10000).toFixed(2);
  if (amt != 0) {
    legendData.push(list[i].ctName);
    seriesData.push({
      name: list[i].ctName,
      value: Number(list[i].amt / 10000).toFixed(2),
    });
  }
}
if (seriesData.length == 0) {
  seriesData.push({
    name: "无数据",
    value: 0.0,
  });
}

export default {
  components: {
    charts,
  },
  data() {
    return {
      navs: [
        {
          name: "主页",
          icon: "fa-home",
        },
        {
          name: "项目",
          icon: "fa-road",
        },
        {
          name: "分包",
          icon: "fa-users",
        },
        {
          name: "计量",
          icon: "fa-flag",
        },
        {
          name: "计划",
          icon: "fa-calendar",
        },
        {
          name: "进度",
          icon: "fa-hourglass-half",
        },
        {
          name: "变更",
          icon: "fa-tags",
        },
        {
          name: "材料",
          icon: "fa-cubes",
        },
        {
          name: "填报",
          icon: "fa-pencil",
        },
      ],
      nowActive: "",
      configPie: {
        tooltip: {
          trigger: "item",
          formatter: "{b} <br> 合同金额: {c} <br> 金额占比: {d}%",
        },
        series: [
          {
            type: "pie",
            name: "分包合同金额(万元)",
            radius: "50%",
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "#fff",
              },
            },
            label: {
              color: "inherit",
            },
          },
        ],
      },
      configBar: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var dataValue = params[0].value[1];
            return (
              params[0].axisValue +
              '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
              params[0].color +
              ';"></span>' +
              "完成比例：" +
              (dataValue * 100).toFixed(2) +
              "%"
            );
          },
        },
        grid: {
          left: "0%",
          top: "0%",
          right: 30,
          bottom: 10,
          containLabel: true,
        },
        dataset: {
          source: json1.rtnObj.data,
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
          },
        },
        xAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            formatter: function (value, index) {
              return (value * 100).toFixed(0) + "%";
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1,
              type: "solid",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            show: true,
            yAxisIndex: 0,
            startValue: startValue,
            endValue: endValue,
            bottom: 0,
          },
          {
            type: "slider",
            show: true,
            yAxisIndex: 0,
            startValue: startValue,
            endValue: endValue,
            top: 0,
            right: 0,
            width: 20,
            height: "80%",
            fillerColor: "#2f89cf",
            textStyle: {
              color: "rgba(255,255,255,.6)",
            },
            dataBackground: {
              areaStyle: {
                color: "yellow",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
          },
        ],
      },
    };
  },
  mounted() {
    this.nowActive = this.navs[0].icon;
    this.registerSize();
  },
  destroyed() {
    this.clearSize();
  },
  methods: {
    handleNavClick(item) {},
    registerSize() {
      this.setSize();
      window.addEventListener("resize", this.setSize);
    },
    setSize() {
      const height = window.innerHeight;
      document.documentElement.style.fontSize = height / 10 + "px";
    },
    clearSize() {
      window.removeEventListener("resize", this.setSize);
    },
  },
};
</script>

<style lang="less" scoped>
.slotcontent {
  position: absolute;
  left: 50%;
  top: 0;
  width: 100%;
  height: 0;
  z-index: 99;
  .main_title {
    position: absolute;
    left: 0;
    top: 40px;
    transform: translateX(-50%);
    text-align: center;
    white-space: nowrap;
    color: #f36806;
    font-size: 15px;
  }
  .sub_title {
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: #128c8e;
    font-weight: bold;
    position: absolute;
    transform: translateX(-50%);
    left: 0;
    top: 10px;
    text-align: center;
  }
  .bot_content {
    padding-top: 60px;
    width: 100%;
    transform: translateX(-50%);
    text-align: center;
    .tip {
      color: red;
      font-size: 15px;
    }
    .layui-badge {
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 2px;
      padding: 0 6px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      border-radius: 2px;
    }
  }
}
.workbench {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000d4a url("~@/assets/bg.jpg") center top;
  background-size: cover;
  .boxall {
    border: 1px solid rgba(25, 186, 139, 0.17);
    padding: 0 0.1rem 0.2rem 0.1rem;
    // background: rgba(255, 255, 255, 0.04) url('~@/assets/line.png');
    position: relative;
    margin-bottom: 0.15rem;
    .title {
      font-size: 0.2rem;
      color: #fff;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .boxall::before,
  .boxfoot::before {
    border-left: 2px solid #02a6b5;
    left: 0;
  }
  .boxall:before,
  .boxall:after {
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
    content: "";
    border-top: 2px solid #02a6b5;
    top: 0;
  }
  .boxfoot:before,
  .boxfoot:after {
    position: absolute;
    width: 0.1rem;
    height: 0.1rem;
    content: "";
    border-bottom: 2px solid #02a6b5;
    bottom: 0;
  }
  .boxall:after,
  .boxfoot:after {
    border-right: 2px solid #02a6b5;
    right: 0;
  }
  .top {
    height: 1.05rem;
    // background: url('~@/assets/head_bg.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    text-align: center;
    .title {
      color: #fff;
      text-align: center;
      font-size: 0.4rem;
      line-height: 0.6rem;
    }
    .view-nav-contain {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 999;
      background-color: rgba(0, 38, 77, 0.7);
      padding: 0.1rem 0;
      .view-nav-word {
        margin-top: 0.05rem;
        font-size: 0.15rem;
        color: #ffffff;
        width: 0.45rem;
        text-align: center;
      }
      .view-nav-icon-contain {
        border-radius: 50%;
        position: relative;
        width: 0.35rem;
        height: 0.35rem;
        margin: 0 auto;
        &.view-selected {
          background-color: #e4a53b;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.7),
            0 4px 8px rgba(255, 255, 255, 0.35);
        }
        .view-nav-icon {
          display: flex;
          width: 0.35rem;
          height: 0.35rem;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 0.2rem;
        }
      }
      .view-nav {
        display: inline-block;
        list-style: none;
        position: relative;
        padding: 0 0.05rem;
        cursor: pointer;
      }
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    padding-bottom: 0.1rem;
  }
  .overallsituation {
    height: 2.5rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    ::v-deep .ant-carousel {
      flex: 1;
      overflow: hidden;
      .slick-slider {
        height: 100%;
        display: flex;
        flex-direction: column;
        .slick-dots {
          position: static;
          display: inline-flex !important;
          flex-direction: row;
          align-items: center;
          align-self: flex-end;
          width: fit-content;
          text-align: right;
          height: auto;
          padding: 5px;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          li button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin: 0 3px;
          }
        }
        .slick-list {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          .slick-track {
            flex: 1;
            overflow: hidden;
            .slick-slide {
              height: 100%;
              overflow: auto;
            }
          }
        }
      }
    }
  }
  .completesituation {
    height: 2.5rem;
    display: flex;
    flex-direction: column;
    ::v-deep .chart {
      flex: 1;
    }
  }
  .savevision {
    flex: 1;
  }
  .main {
    height: 5.15rem;
    margin-bottom: 0.15rem;
  }
  .processvision {
    flex: 1;
  }
  .subcontractsituation {
    height: 5.15rem;
    display: flex;
    flex-direction: column;
    ::v-deep .chart {
      flex: 1;
    }
  }
  .measurevision {
    flex: 1;
  }
  .left {
    width: 25%;
    display: flex;
    flex-direction: column;
    padding: 0 0.1rem;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    p {
      margin: 0;
    }
    .proj-info-box-title {
      text-align: center;
      color: white;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.2rem;
      background-color: rgba(30, 216, 212, 0.47);
    }
    .proj-info-box-content {
      font-size: 0.25rem;
      text-align: center;
      height: 0.7rem;
      line-height: 0.7rem;
      color: yellow;
      font-family: electronicFont;
      background: rgba(55, 204, 37, 0.39);
    }
    .proj-info-introduce {
      font-size: 0.15rem;
      color: white;
      font-weight: 700;
    }
    .proj-info-introduce p {
      padding: 5px 0;
      margin: 0;
    }
    .proj-info-introduce p span {
      color: yellow;
      font-family: electronicFont;
      font-size: 0.2rem;
    }
  }
  .mid {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 0 0.1rem;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
  }
  .right {
    width: 25%;
    display: flex;
    flex-direction: column;
    padding: 0 0.1rem;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
  }
}
</style>
