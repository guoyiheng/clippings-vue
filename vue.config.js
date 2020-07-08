'use strict'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 7777 // dev port

const env = process.env.NODE_ENV
console.log('env:', env)

module.exports = {
  // 配置oss后打开该行
  //   publicPath: env === 'development' ? '/' : 'https://xxx.xxx.xxx/',
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'https://api.guoyiheng.xyz',
        target: 'http://127.0.0.1:8000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    devtool: 'source-map'
  },
  //   chainWebpack: config => {
  //     // GraphQL Loader
  //     config.module
  //       .rule('graphql')
  //       .test(/\.graphql$/)
  //       .use('graphql-tag/loader')
  //       .loader('graphql-tag/loader')
  //       .end()
  //       // 你还可以再添加一个 loader
  //       .use('other-loader')
  //       .loader('other-loader')
  //       .end()
  //   },
  transpileDependencies: ['vuetify']
}
