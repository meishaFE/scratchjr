const utils = require('./utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 清理编译时的无用信息
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 在webpack中拷贝文件和文件夹
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 用于优化或者压缩CSS资源

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: 'errors-only',

  module: {
    // 处理样式
    rules: utils.styleConfig({ sourceMap: false, extract: true })
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'dist/static'
      }
    ]),

    // 提取 css 到单独的文件
    new miniCssExtractPlugin({
      filename: 'styles.css'
    }),

    // 优化压缩CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`completed!!`]
      }
    })
  ]
});

module.exports = webpackConfig;
