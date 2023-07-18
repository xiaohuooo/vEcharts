import Vue from "vue";
import Router from "vue-router";
import { constantRouterMap } from "@/config/router"; //开发页面

// hack router push callback
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

const loginIgnore = {
  names: ["404", "403"], //根据路由名称匹配
  paths: ["/login"], //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path);
  },
};

const router = new Router({
  mode: "hash",
  routes: constantRouterMap,
});

window.router = router;
export default router;
