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
        target: 'https://api.guoyiheng.xyz',
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
  transpileDependencies: ['vuetify']
}
