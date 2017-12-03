'use strict';

var isNil = require('is-nil');

var MAX_SAFE_INTEGER = 9007199254740991;

module.exports = function (value, length) {

  value  = (typeof value === 'number' || /^(?:0|[1-9]\d*)$/.test(value)) ? +value : -1;
  length = isNil(length) ? MAX_SAFE_INTEGER : length;

  return value > -1 && value % 1 === 0 && value < length;
};
