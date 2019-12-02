const path = require('path');
const postcssVars = require('postcss-simple-vars');
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
      modules: {
        localIdentName: '[name]_[local]_[hash:base64:5]'
      }
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      ident: 'postcss',
      plugins: function() {
        return [postcssImport, postcssVars];
      }
    }
  };
  const lessLoader = { loader: 'less-loader' };

  if (options.extract) {
    return [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, cssLoader, postcssLoader]
      },
      {
        test: /\.less$/,
        use: [miniCssExtractPlugin.loader, cssLoader, postcssLoader, lessLoader]
      }
    ];
  } else {
    return [
      {
        test: /\.css$/,
        use: [styleLoader, cssLoader, postcssLoader]
      },
      {
        test: /\.less$/,
        use: [styleLoader, cssLoader, postcssLoader, lessLoader]
      }
    ];
  }
};

exports.assetsPath = function(_path) {
  const assetsSubDirectory = 'static';

  return path.posix.join(assetsSubDirectory, _path);
};
