const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // proxy: {
    //   "^/v3": {
    //     target: "https://restapi.amap.com",
    //     // pathRewrite: { "^/v3": "" },
    //     ws: false,
    //     changeOrigin: true,
    //   },
    //   "^/openApi": {
    //     target: "http://47.107.103.35:8010",
    //     // pathRewrite: { "^/v3": "" },
    //     ws: false,
    //     changeOrigin: true,
    //   },
    //   "^/api": {
    //     target: "http://120.46.172.49:31602",
    //     // pathRewrite: { "^/v3": "" },
    //     ws: false,
    //     changeOrigin: true,
    //   },
    // },
  },
  configureWebpack: (config) => {
    // 环境判断
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.optimization.minimizer[0].options.minimizer.options.compress =
        Object.assign(
          config.optimization.minimizer[0].options.minimizer.options.compress,
          {
            drop_console: true,
          }
        );
    } else {
      // 为开发环境修改配置...
    }
  },
});
