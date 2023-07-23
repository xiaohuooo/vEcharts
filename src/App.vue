<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { statisticsHour } from "@/api/interface/api";
export default {
  data() {
    return {};
  },
  // async mounted() {
  //   const res = await statisticsHour({ a: 1 });
  //   console.log(res, "----rse");
  // },
  methods: {},
};
</script>

<style lang="less" scoped>
#app {
  font-family: Microsoft YaHei-Regular, Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
