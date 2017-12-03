# is-index

> Checks if the given value is a valid array-like index.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/gearcase/is-index/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/gearcase/is-index/master.svg?style=flat-square)](https://travis-ci.org/gearcase/is-index)
[![coverage:?](https://img.shields.io/coveralls/gearcase/is-index/master.svg?style=flat-square)](https://coveralls.io/github/gearcase/is-index)


## Install

```
$ npm install --save is-index 
```


## Usage

> For more use-cases see the [tests](https://github.com/gearcase/is-index/blob/master/test/spec/index.js)

```js
var isIndex = require('is-index');

isIndex(1);        // => true
isIndex(1, 5);     // => true
isIndex('1');      // => true
isIndex('1', 5);   // => true
isIndex('1', '5'); // => true

isIndex();         // => false
isIndex(null);     // => false
isIndex(true);     // => false
isIndex({});       // => false
isIndex([]);       // => false
```

## API

### isIndex(value, length)

`value` - The value to check.

`length` - The upper bounds of a valid index. Default is MAX_SAFE_INTEGER.

## Related

- [is-length](https://github.com/gearcase/is-length) - Checks if the given value is a valid array-like length.
- [to-length](https://github.com/gearcase/to-length) - Converts value to an integer suitable for use as the length of an array-like object.
- [drop-left](https://github.com/gearcase/drop-left) - Creates a slice of array with n elements dropped from the beginning.
- [drop-right](https://github.com/gearcase/drop-right) - Creates a slice of array with n elements dropped from the end.
- [pick-items](https://github.com/mock-end/pick-items) - Randomly sampling some items from an array. 
- [pick-item](https://github.com/mock-end/pick-item) - Randomly sampling a item from an array.
- [shuffle-arr](https://github.com/mock-end/shuffle-arr) - Randomize the order of the elements in an array or array-like object. 
- [is-array-like](https://github.com/gearcase/is-array-like) - Checks if the given value is an array or array-like object.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/gearcase/is-index/issues/new).
