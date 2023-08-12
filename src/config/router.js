/**
 * @desc 实际开发项目的基础路由
 */

/**
 * @desc meta 参数详解
 * @params {boolean} showHeader 控制PageLayout的header的显示和隐藏
 */
import { PageLayout } from "@/layouts";

export const constantRouterMap = [
  {
    path: "/",
    component: PageLayout,
    name: "PageLayout",
    redirect: "/version1",
    children: [
      {
        path: "/version1",
        name: "version1",
        component: () => import("@/pages/home/version1"),
        meta: {
          showHeader: true,
        },
      },
      {
        path: "/version2",
        name: "version2",
        component: () => import("@/pages/home/version2"),
        meta: {
          showHeader: true,
        },
      },
      {
        path: "/version3",
        name: "version3",
        component: () => import("@/pages/home/version3"),
        meta: {
          showHeader: true,
        },
      },
      {
        path: "/version4",
        name: "version4",
        component: () => import("@/pages/home/version4"),
        meta: {
          showHeader: true,
        },
      },
    ],
  },
];
