const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const utils = require('./utils')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');





const configuration = merge(commonConfig, 
{
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/main.js',
    vendors: ['vue', 'vue-router']
  },
  output: {
    path: path.join(__dirname, '../hi/dist'),
    // publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    compress: true,
    open: true,
    hot: true,
    clientLogLevel: 'warning',
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: '/',
    quiet: true,
    progress: true,
    watchOptions: {
      poll: config.dev.poll,
    },
    inline:false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/index.html'),
      inject: true
    })
  ]
}
)


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      configuration.devServer.port = port

      // Add FriendlyErrorsPlugin
      configuration.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${configuration.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(configuration)
    }
  })
})