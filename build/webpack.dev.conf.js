const path = require('path');
const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 清理编译时的无用信息
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 在webpack中拷贝文件和文件夹

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  stats: 'errors-only',

  module: {
    // 处理样式
    rules: utils.styleConfig({ sourceMap: false, extract: false })
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static'
      }
    ]),

    new webpack.NoEmitOnErrorsPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`completed!!`]
      }
    })
  ]
});

module.exports = webpackConfig;
