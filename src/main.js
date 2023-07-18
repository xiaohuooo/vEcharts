import Vue from "vue";
import App from "./App.vue";
import * as echarts from "echarts";
import antd from "ant-design-vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import "./styles/index.less";
//这一段是引入mock
process.env.VUE_APP_Mock && require("./mock");
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// 使用antd
Vue.use(antd);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
