var path = require('path');
var webpack = require('webpack');
var cooking = require('cooking');
var build = require('./build.js');

cooking.set({
  entry: build.entries(),
  template: build.templates(),
  dist: './dist',
  devServer: {
    enable: true,
    port: 8081,
    // 输出文件目录的 URL 路径，注意这里的配置会覆盖下面的 publicPath
    publicPath: '/',
    // 热替换
    hot: true,
    // 提取 CSS
    extractCSS: false,
    // 显示日志信息在页面上
    log: true,
    hostname: 'localhost',
    protocol: 'http:',
    // HTML5 history API
    historyApiFallback: true,
    // 控制台输出的信息
    stats: 'errors-only',
    noInfo: true,
    quiet: false,
    lazy: false
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: false,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  static: true,
  devtool: '#cheap-module-eval-source-map',
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'vue$': 'vue/dist/vue.js',
    'jquery': path.resolve(__dirname, './node_modules/jquery/src/jquery'),
    '@': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'lint', 'sass', 'autoprefixer'],
  externals: build.externals()
});

module.exports = cooking.resolve();