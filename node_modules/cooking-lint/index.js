var webpack = require('webpack')
var isNextWebpack = false
try {
  isNextWebpack = require('cooking/util/check').isNextWebpack
} catch(_) {}

module.exports = function (cooking) {
  cooking.add('preLoader.js', {
    test: /\.jsx?$/,
    exclude: /node_modules|bower_components/,
    loader: 'eslint-loader'
  })

  cooking.add('preLoader.vue', {
    test: /\.vue$/,
    exclude: /node_modules|bower_components/,
    loader: 'eslint-loader'
  })

  cooking.config.eslint = {
    formatter: require('eslint-friendly-formatter')
  }
  if (!isNextWebpack) {
    // eslint error 会打断 webpack@1 build 过程
    cooking.config.eslint.emitWarning = true
  }
}
