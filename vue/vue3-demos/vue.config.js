const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: (config) => {
  //   config.externals = {
  //     'origin-elements': "http://localhost/origin-elements.js"
  //   }
  // }
});
