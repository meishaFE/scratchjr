const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 清理编译时的无用信息
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'); // 用于优化或者压缩CSS资源
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 在webpack中拷贝文件和文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'production',
  stats: 'errors-only',

  // context是webpack编译时的基础目录，entry入口会相对于此目录查找
  context: path.resolve(__dirname, '../'),

  entry: {
    index: './src/index.js'
  },

  output: {
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'), // 打包后文件输出的目录
    publicPath: '/'
  },

  resolve: {
    // 是否将符号链接(symlink)解析到它们的符号链接位置(如 npm link)
    symlinks: false,

    // 创建import或require的别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[ext]')
        }
      },
      ...utils.styleConfig({ sourceMap: false, extract: true })
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
    }),

    // 提取 css 到单独的文件
    new miniCssExtractPlugin({
      filename: 'styles.css'
    }),

    // 优化压缩CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`completed!!`]
      }
    }),

    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static'
      },
      {
        from: 'build/package.json',
        to: ''
      }
    ])
  ]
};
