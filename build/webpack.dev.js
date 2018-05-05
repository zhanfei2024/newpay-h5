const merge = require('webpack-merge');
const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const common = require('./webpack.common.js');
const config = require('../config')
const utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = merge(common, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  devtool: 'inline-source-map',
  devServer: {
    compress:true,
    hot:true,
    inline:true,
    port: "8080",
    quiet: false,
    stats: { colors: true },
    historyApiFallback: true,
    proxy: {
      "/host/*": {
        // target: "https://fapi.op110.com.cn/",
        target: "http://vutest.op110.com.cn/newpay-service",
        changeOrigin: true,
        secure: false,
        // target: "http://192.168.110.204:8080/",
        // secure: false
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
        // APP_HOST: '"http://dev.op110.com.cn"',
      }
    }),

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CleanWebpackPlugin(["dist"], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
});

//webpack要运行此文件 需要命令行接口 --config（没有此参数会默认执行webpack.config.js）
