# to-str

> Converts the given value to a string.



[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/to-str/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/bubkoo/to-str/master.svg?style=flat-square)](https://travis-ci.org/bubkoo/to-str)
[![coverage:?](https://img.shields.io/coveralls/bubkoo/to-str/master.svg?style=flat-square)](https://coveralls.io/github/bubkoo/to-str)


## Install

```
$ npm install --save to-str 
```


## Usage

> For more use-cases see the [tests](https://github.com/bubkoo/to-str/blob/master/test/spec/index.js)

```js
var toString = require('to-str');

toString();          // => ''
toString(null);      // => ''
toString(0);         // => '0'
toString(-0);        // => '-0'
toString('abc');     // => 'abc'
toString('-1.100');  // => -1
toString([1, 2, 3]); // => '1,2,3'

toString({ foo: 'bar' });        
// => '[object Object]'

toString(function () { console.log(123); });
// => 'function () { console.log(123); }'
```

## Related

- [to-num](https://github.com/bubkoo/to-num) - Converts the given value to a number.
- [to-integer](https://github.com/bubkoo/to-integer) - Converts the given value to an integer.
- [to-length](https://github.com/bubkoo/to-length) - Converts value to an integer suitable for use as the length of an array-like object.
- [to-lower](https://github.com/bubkoo/to-lower) - Converts string, as a whole, to lower case.
- [to-upper](https://github.com/bubkoo/to-upper) - Converts string, as a whole, to upper case.
- [to-path](https://github.com/bubkoo/to-path) - Converts value to a property path array. 
- [to-source-code](https://github.com/bubkoo/to-source-code.git) - Converts function to its source code.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/bubkoo/to-str/issues/new).
