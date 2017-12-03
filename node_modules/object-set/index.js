'use strict';

var isNil    = require('is-nil');
var toPath   = require('to-path');
var isIndex  = require('is-index');
var isObject = require('is-object');


function assignValue(object, key, value) {

  var objValue = object[key];

  if (!(Object.prototype.hasOwnProperty.call(object, key) && objValue === value) ||
    (value === undefined && !(key in object))) {

    object[key] = value;
  }
}


module.exports = function (object, path, value) {

  if (isNil(object)) {
    return object;
  }

  var nested    = object;
  var paths     = toPath(path);
  var index     = -1;
  var length    = paths.length;
  var lastIndex = length - 1;

  while (!isNil(nested) && ++index < length) {

    var key = paths[index];

    if (isObject(nested)) {

      var newValue = value;

      if (index !== lastIndex) {

        var objValue = nested[key];

        newValue = isNil(objValue)
          ? (isIndex(paths[index + 1]) ? [] : {})
          : objValue;
      }

      assignValue(nested, key, newValue);
    }

    nested = nested[key];
  }

  return object;
};
