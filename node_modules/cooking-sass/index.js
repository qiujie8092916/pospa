var load = require('./sass-loader')

module.exports = function (cooking) {
  var loader
  var SOURCE_MAP = cooking.config.devtool

  if (process.env.NODE_ENV === 'production') {
    loader = load({
      sourceMap: SOURCE_MAP ? '#source-map' : false,
      extract: !!cooking.config.extractCSS,
      postcss: !!cooking.config.postcss
    })
  } else {
    loader = load({
      postcss: !!cooking.config.postcss
    })
  }

  cooking.add('loader.scss', {
    test: /\.scss$/,
    loader: loader.scss
  })

  cooking.add('loader.sass', {
    test: /\.sass$/,
    loader: loader.sass
  })
}
