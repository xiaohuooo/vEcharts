<template>
  <div :style="style">
    <p class="title" v-if="title">
      {{ title }}
    </p>
    <div class="content">
      <slot></slot>
      <v-chart
        v-if="option"
        :option="option"
        :theme="theme"
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
    theme: {
      type: String,
      default: "",
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
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
  text-shadow: 0px 0px 9px #158eff;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("~@/assets/weather/titbg.png");
  margin-bottom: 16px;
  padding-left: 32px;
}
.content {
  // background-color: #fdf7f714;
  margin-bottom: 25px;
  height: calc(100% - 44px);
}
</style>
