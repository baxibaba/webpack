//首先引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack')
const path = require('path')
const config = require('./public/config')[isDev ? 'dev' : 'build'];
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:6].js',
    publicPath: '/'
  },
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "corejs": 3
                }
              ]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')({
                  "overrideBrowserslist": [
                    ">0.25%",
                    "not dead"
                  ]
                })
              ]
            }
          }
        }, 'less-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /.html$/,
        use: 'html-withimg-loader'
      }

    ]
  },
  plugins: [
    //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      config: config.template,
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      // hash: true //是否加上hash，默认是 false
    }),
    new CleanWebpackPlugin(), // 清楚dist 文件夹 可以设置指定文件夹
    new CopyWebpackPlugin([
      {
        from: './public/js/base.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true,
      },
      {
        from: './public/debounce.js',
        to: path.resolve(__dirname, 'dist'),
        flatten: true,
      },
      {
        from: './public/throttle.js',
        to: path.resolve(__dirname, 'dist'),
        flatten: true,
      }
    ], {
      ignore: ['other.js'] // 忽略other.js文件
    }),
    // new webpack.ProvidePlugin({ // 是webpack 内置插件 可以设置为全局变量，不用每个页面都引入
    //   React: 'react',
    //   Component: ['react', 'Component'],
    //   Vue: ['vue/dist/vue.esm.js', 'default'],
    //   $: 'jquery',
    //   _map: ['lodash', 'map']
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' //个人习惯将css文件放在单独目录下
    }),
    new webpack.HotModuleReplacementPlugin() //热更新插件

  ],
  devServer: {
    port: '4000', //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true, //是否启用 gzip 压缩
    hot: true,
    // proxy: { // 解决跨越时候使用
    //   "/api": "http://localhost:4000",

    // }
  },
  devtool: 'cheap-module-eval-source-map', //开发环境下使用

}