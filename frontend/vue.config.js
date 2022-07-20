const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
            target: 'http://localhost:3000',
              changeOrigin: true,
              pathRewrite : {
                '^/api' : ''
              }
         }
      }
    }
})
