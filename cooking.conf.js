var path = require('path');
var cooking = require('cooking');
var App = require('./app.json');

const merge = function(a, b) {
  return {
    css: (a.css || []).concat(b.css || []),
    js: (a.js || []).concat(b.js || [])
  }
}

const templates = function() {
  return App.pages.map(p => {
    return {
      title: p.title,
      filename: p.entry + '.html',
      template: path.resolve(__dirname, 'index.tpl'),
      cdn: merge(App.cdn, p.cdn),
      chunks: ['vendor', 'manifest', p.entry]
    }
  })
}

const entries = function() {
  var result = {}
  App.pages.forEach(p => {
    result[p.entry] = path.resolve(App.basePath, p.entry)
  })
  return result
}

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  // entry: entries(),
  dist: './dist',
  // template: templates(),
  template: "./index.tpl",
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
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  static: true,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'lint', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();