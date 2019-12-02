module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: ['last 3 versions'] } }],
    '@babel/preset-react'
  ],

  plugins: [
    '@babel/plugin-proposal-class-properties', // es6 class定义转换
    '@babel/plugin-transform-async-to-generator'
  ]
};
