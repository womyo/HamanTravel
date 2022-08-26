const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  outputDir : path.resolve("../backend/public"),
  transpileDependencies: true,
  lintOnSave : false,
  productionSourceMap: true,
  configureWebpack: {
    mode: 'production',
    devtool: 'eval'
  },
  devServer: {
    proxy : {
        '/api' : {
            // target: 'http://ec2-15-164-165-238.ap-northeast-2.compute.amazonaws.com',
            target: "http://localhost:3000",
            changeOrigin: true,
            pathRewrite : {
              '^/api' : ''
            }
         }
      }
    }
})
