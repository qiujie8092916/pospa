/**
 * @param  {object} cooking - add, remove, _userConfig and config
 * @param  {*} options - custom option
 */
module.exports = function (cooking, options) {
  var plugin = []
  if ({}.toString.call(cooking.config.postcss) === '[object Function]') {
    plugin = cooking.config.postcss()
  }

  cooking.config.postcss = function () {
    return plugin.concat(require('autoprefixer')(options || {}))
  }
  cooking.add('vue.autoprefixer', false)
}
