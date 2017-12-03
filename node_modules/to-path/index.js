'use strict';

var isNil       = require('is-nil');
var isSymbol    = require('is-symbol');
var isArrayLike = require('is-array-like');
var toString    = require('to-str');

var rePropName   = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
var reEscapeChar = /\\(\\)?/g;


function toKey(key) {
  return (typeof key === 'string' || isSymbol(key))
    ? key
    : ('' + key);
}


module.exports = function (value) {

  if (isNil(value)) {
    return [];
  }

  if (isSymbol(value)) {
    return [value];
  }


  var result = [];

  if (typeof value !== 'string' && isArrayLike(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      result.push(toKey(value[i]));
    }
    return result;
  }


  toString(value)
    .replace(rePropName, function (match, number, quote, string) {
      result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
    });

  return result;
};
