// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://4caeisr4q3.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  pluginOptions: {
    vuetify: {
    },
  },
});

/*const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {},
  },
});*/
