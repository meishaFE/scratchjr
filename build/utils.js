const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

exports.styleConfig = function(options) {
  const styleLoader = { loader: 'style-loader' };
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      modules: true, // 是否启用 css 模块化
      importLoaders: 1, // css-loader 后面是否还有其他的 loader
      localIdentName: '[name]_[local]_[hash:base64:5]',
      camelCase: true
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      ident: 'postcss',
      plugins: function() {
        return [
          postcssImport,
          autoprefixer({
            browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
          })
        ];
      }
    }
  };
  const lessLoader = { loader: 'less-loader' };

  if (options.extract) {
    return [
      {
        test: /\.less$/,
        use: [miniCssExtractPlugin.loader, cssLoader, postcssLoader, lessLoader]
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }]
      }
    ];
  } else {
    return [
      {
        test: /\.less$/,
        use: [styleLoader, cssLoader, postcssLoader, lessLoader]
      },
      {
        test: /\.css$/,
        use: [styleLoader, { loader: 'css-loader', options: { importLoaders: 1 } }]
      }
    ];
  }
};

exports.assetsPath = function(_path) {
  const assetsSubDirectory = 'static';

  return path.posix.join(assetsSubDirectory, _path);
};
