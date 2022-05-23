const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('tsRule')
      .test(/\.tsx?$/)
      .use('awesome-typescript-loader')
        .loader('awesome-typescript-loader')
        .end()
  }
})
