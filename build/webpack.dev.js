const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 清理编译时的无用信息
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 在webpack中拷贝文件和文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包 html

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  // context是webpack编译时的基础目录，entry入口会相对于此目录查找
  context: path.resolve(__dirname, '../'),

  entry: {
    index: './demo/main.jsx'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../demo-dist'), // 打包后文件输出的目录
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

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: true,
    quiet: true,
    contentBase: path.resolve(__dirname, '../demo-dist')
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../demo')]
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
      ...utils.styleConfig({ sourceMap: true, extract: false })
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
      filename: './index.html'
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
        to: 'static/scratchjr'
      },

      {
        from: 'demo/proFile',
        to: 'proFile'
      }
    ])
  ]
};
