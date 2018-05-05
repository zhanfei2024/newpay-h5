const path = require("path")
const webpack = require("webpack")
const copyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const vueLoaderConfig = require('./vue-loader.conf')

var resolve=function(str){
  return path.resolve(__dirname,str)
}
// console.log('postcss:',vueLoaderConfig.loaders.postcss);
vueLoaderConfig.postcss=[require("autoprefixer")({  
  browsers: ["Android >= 4", "Explorer >= 10", "iOS >= 6"],
  cascade: false
})]
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./../dist"),
    filename: "build.js",
    chunkFilename: "[name][hash].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
        // options: {
        //   postcss: [
        //     //自动添加css兼容性前缀
        //     require("autoprefixer")({  
        //       browsers: ["Android >= 4", "Explorer >= 10", "iOS >= 6"],
        //       cascade: false
        //     })
        //   ]
        // }
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueLoaderConfig
      // },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // exclude: /node_modules/,
        // include: [resolve('src'), resolve('build'), resolve('node_modules/vue-echarts')]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          "less-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: "file-loader",
        query: {
          name: "assets/[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],    
    alias: {
      vue$: "vue/dist/vue",
      //所有图片引用都以 ~assets 开头，可以再在最后构建时输出到 assets 目录
      assets: path.resolve(__dirname, "../src/assets"),
      lib:path.resolve(__dirname, "../src/lib")
    }
  },
  plugins: [
    // require('autoprefixer'),
    new HtmlWebpackPlugin({
      hash: true,
      template: "src/index.html"
    }),
    //将排除的第三方依赖输出到输出目录
    new copyWebpackPlugin([
      { from: "node_modules/vue/dist/vue.min.js", to: "libs/vue/vue.min.js" },
      {
        from: "node_modules/vue-router/dist/vue-router.min.js",
        to: "libs/vue/vue-router.min.js"
      },
      {
        from: "node_modules/vue-resource/dist/vue-resource.min.js",
        to: "libs/vue/vue-resource.min.js"
      },
      {
        from: "node_modules/vuex/dist/vuex.min.js",
        to: "libs/vue/vuex.min.js"
      },
      {
        from: "node_modules/mint-ui/lib/index.js",
        to: "libs/mint-ui/mint-ui.min.js"
      },
      {
        from: "node_modules/mint-ui/lib/style.min.css",
        to: "libs/mint-ui/mint-ui.min.css"
      },
      { from: "src/assets/favicon.ico", to: "favicon.ico" },
      { from: "src/lib/util.js", to: "libs/util.js" },
    ])
  ],
  //从输出中排除第三方依赖
  externals: {
    "vue": "Vue",
    "vue-router": "VueRouter",
    "vuex": "Vuex",
    "mint-ui": "MINT"
  },
}


