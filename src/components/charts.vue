<template>
  <div :style="style">
    <p class="title">
      <span></span>
      {{ title }}
    </p>
    <div class="content">
      <slot></slot>
      <v-chart
        v-if="option"
        :option="option"
        autoresize
        :style="special == 1 || special == 2 ? 'height: calc(100% - 55px)' : ''"
      />
    </div>
  </div>
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts";

export default {
  name: "charts",
  components: {
    VChart,
  },
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    title: {
      type: String,
      default: "",
    },
    special: {
      type: Number,
      default: 0,
    },
    option: {
      type: Object,
      default: () => {},
    },
  },
  provide: {
    // [THEME_KEY]: "dark",
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.title {
  height: 38px;
  line-height: 38px;
  color: #fff;
  text-align: left;
  font-size: 22px;
  text-shadow: 0px 0px 9px #158eff;
  background: linear-gradient(
    90deg,
    #05294b 0%,
    #021f3a 0%,
    rgba(5, 41, 75, 0) 100%
  );
  margin-bottom: 16px;
  span {
    display: inline-block;
    width: 2px;
    height: 16px;
    background: #0783fa;
    margin-right: 10px;
  }
}
.content {
  // background-color: #fdf7f714;
  margin-bottom: 25px;
  height: calc(100% - 44px);
}
.special {
  background: #2a497b;
  width: 93% !important;
  margin: auto;
  margin-top: 10px;
}
</style>
