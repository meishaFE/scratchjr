const path = require('path');
const utils = require('./utils');

module.exports = {
  target: 'web',
  devtool: 'cheap-module-source-map',

  // context是webpack编译时的基础目录，entry入口会相对于此目录查找
  context: path.resolve(__dirname, '../'),

  entry: {
    index: './src/index.js'
  },

  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'), // 打包后文件输出的目录
    filename: '[name].js',

    // 正式发布环境下编译输出的上线路径的根路径
    // 如：publicPath: "http://cdn.example.com/
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
        include: [
          path.resolve(__dirname, '../src')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2,
          name: utils.assetsPath('media/[name].[ext]')
        }
      }
    ]
  }
};
