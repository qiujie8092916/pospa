# to-path

> Converts string to a property path array.



[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/gearcase/to-path/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/gearcase/to-path/master.svg?style=flat-square)](https://travis-ci.org/gearcase/to-path)
[![coverage:?](https://img.shields.io/coveralls/gearcase/to-path/master.svg?style=flat-square)](https://coveralls.io/github/gearcase/to-path)


## Install

```
$ npm install --save to-path 
```

## Usage

> For more use-cases see the [tests](https://github.com/gearcase/to-path/blob/master/test/spec/index.js)

```js
var toPath = require('to-path');

toPath('a');          // => ['a']
toPath('a.b.c');      // => ['a', 'b', 'c']
toPath('a[0].b.c');   // => ['a', '0', 'b', 'c']
toPath('a[x].b.c');   // => ['a', 'x', 'b', 'c']
toPath('a["x"].b.c'); // => ['a', 'x', 'b', 'c']
toPath(0);            // => ['0']
toPath([1, 2, 3]);    // => ['1', '2', '3']
```

## Related

- [object-at](https://github.com/gearcase/object-at) - Get object's property according to the path.
- [object-has](https://github.com/gearcase/object-has) - Checks if path is a direct property of object.
- [object-set](https://github.com/gearcase/object-set) - Sets the value at path of object.
- [object-unset](https://github.com/gearcase/object-unset) - Removes the property at path of object.


## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/gearcase/to-path/issues/new).
