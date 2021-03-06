var App = require('./src/router/rootRouter.json');
var path = require('path');

var merge = function (a, b) {
  return {
    css: (a.css || []).concat(b.css || []),
    js: (a.js || []).concat(b.js || [])
  }
}

exports.entries = function () {
  var result = {}
  App.pages.forEach(p => {
    result[p.entry] = path.resolve(App.basePath, p.entry, p.entry)
  })
  return result
}

exports.templates = function () {
  return App.pages.map(p => {
    return {
      title: p.title,
      filename: "pospa/" + p.entry + ".html",
      template: path.resolve(App.basePath, p.entry, p.entry + '.tpl'),
      cdn: merge(App.cdn, p.cdn),
      chunks: ['vendor', 'manifest', p.entry]
    }
  })
}

exports.externals = function () {
  return App.externals
}
