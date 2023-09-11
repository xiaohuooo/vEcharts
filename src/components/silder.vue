<template>
  <div class="slider">
    <a-slider
      :marks="marks"
      :default-value="0"
      @change="onChange"
      :tip-formatter="formatter"
      style="width: 89%"
      v-model="process"
    />
    <div>
      <span style="margin-right: 10px" @click="back">
        <img src="@/assets/plyh/titmMachine/lplay.png" alt=""
      /></span>
      <span style="margin-right: 10px" @click="play" v-show="isPlay">
        <img src="@/assets/plyh/titmMachine/play.png" alt=""
      /></span>
      <span style="margin-right: 10px" @click="pause" v-show="!isPlay">
        <img src="@/assets/plyh/titmMachine/pause.png" alt=""
      /></span>
      <span style="margin-right: 10px" @click="forward">
        <img src="@/assets/plyh/titmMachine/rplay.png" alt=""
      /></span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Slider",
  props: {
    intervalMonths: { type: Number, default: 6 },
    startDate: { type: String, default: "2023-01" },
    endDate: { type: String, default: "2024-01" },
  },
  data() {
    return {
      isPlay: false,
      process: 0,
      timer: "",
    };
  },
  mounted() {},
  methods: {
    onChange(value) {
      this.$emit("sliderChange", this.getMappedYearMonth(value).format('YYYY/MM/DD'));
    },
    play() {
      this.isPlay = false;
      this.$emit("pause");
      clearInterval(this.timer);
    },
    back() {
      this.process >= 5 ? (this.process -= 5) : null;
      this.$emit("sliderChange", this.getMappedYearMonth(this.process).format('YYYY/MM/DD'));
    },
    forward() {
      this.process < 100 ? (this.process += 5) : null;
      this.$emit("sliderChange", this.getMappedYearMonth(this.process).format('YYYY/MM/DD'));
    },
    pause() {
      this.isPlay = true;
      this.timer = setInterval(() => {
        this.process++;
        if (this.process >= 100) {
          clearInterval(this.timer);
        }
        this.$emit("sliderChange", this.getMappedYearMonth(this.process).format('YYYY/MM/DD'));
      }, 1000);
      this.$emit("play");
    },
    onAfterChange(value) {
      //   console.log("afterChange: ", value);
    },
    formatter(value) {
      let str = this.getMappedYearMonth(value).format('YYYY-MM-DD');
      return str;
    },
    getMappedYearMonth(number) {
      const startDate = moment(this.startDate);
      const endDate = moment(this.endDate);
      const totalDays = endDate.diff(startDate, "days");
      const mappedMonths = Math.floor((number * totalDays) / 100);
      const mappedDate = startDate.clone().add(mappedMonths, "days");
      return mappedDate;
    },
  },
  computed: {
    marks() {
      const startDateObj = moment(this.startDate);
      const endDateObj = moment(this.endDate);
      const dateList = {};

      let currentDate = startDateObj;
      let index = 0;
      let totalMonths =
        ((endDateObj.year() - startDateObj.year()) * 12 +
          (endDateObj.month() - startDateObj.month())) /
        this.intervalMonths;
      while (currentDate <= endDateObj) {
        const year = currentDate.year();
        const month = currentDate.month() + 1;
        const formattedDate = `${year}.${month.toString().padStart(2, "0")}`;

        dateList[index] = formattedDate;

        currentDate.month(currentDate.month() + this.intervalMonths);
        index += Math.round(100 / totalMonths);
      }

      return dateList;
    },
  },
};
</script>

<style scoped lang="less">
.slider {
  width: 1021px;
  margin: auto;
  height: 67px;
  padding: 0px 24px;
  background: rgba(11, 19, 41, 0.8);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /deep/ .ant-slider {
    margin-bottom: unset;
    .ant-slider-rail {
      // width: 10px;
    }
    .ant-slider-mark {
      top: -25px;
      .ant-slider-mark-text {
        color: #fff;
      }
    }
    .ant-slider-track {
      background: #0a87ff;
    }
    .ant-slider-dot {
      top: -7px;
      width: 1px;
      margin-left: -1px;
      border: unset;
    }
    .ant-slider-handle {
      width: 2px;
      height: 38px;
      background: #0a87ff;
      border: unset;
      margin-top: -10px;
    }
  }
}
</style>
<style lang="less">
.ant-tooltip {
  .ant-tooltip-inner {
    background: #0a87ff;
  }
}
</style>
