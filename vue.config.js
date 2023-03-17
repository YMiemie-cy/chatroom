// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,

// });
module.exports = {
  devServer: {
    proxy: {
      "/news": {
        target: "http://c.m.163.com",
        changeOrigin: true,
        pathRewrite: {
          "^/news": "",
        },
      },
    },
  },
};
