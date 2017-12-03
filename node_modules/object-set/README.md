# object-set

> Sets the value at path of object.


[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/gearcase/object-set/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/gearcase/object-set/master.svg?style=flat-square)](https://travis-ci.org/gearcase/object-set)
[![coverage:?](https://img.shields.io/coveralls/gearcase/object-set/master.svg?style=flat-square)](https://coveralls.io/github/gearcase/object-set)


## Install

```
$ npm install --save object-set 
```

## Usage

> For more use-cases see the [tests](https://github.com/gearcase/object-set/blob/master/test/spec/index.js)

```js
var set    = require('object-set');
var object = { 'a': [{ 'b': { 'c': 3 } }] };

set(object, 'a[0].b.c', 4);
// => { 'a': [{ 'b': { 'c': 4 } }] }

set({ foo: { bar: 'baz' } }, 'foo.arr[0]', 3);
// => { foo: {bar: 'baz', arr: [3] } }

set({ foo: { bar: 'baz' } }, 'foo.arr[1]', 3);
// => { foo: {bar: 'baz', arr: [, 3] } }

set({ foo: { bar: 'baz' } }, 'foo.obj.key', 3);
// => { foo: {bar: 'baz', obj: { key: 3 } } }

set(null, 'foo.obj.key', 3);
// => null

set({ foo: 1 }, 'foo.obj.key', 3);
// => { foo: 1 }
```


## Related


- [object-unset](https://github.com/gearcase/object-unset) - Removes the property at path of object.
- [object-at](https://github.com/gearcase/object-at) - Get object's property according to the path.
- [object-has](https://github.com/gearcase/object-has) - Checks if path is a direct property of object.
- [to-path](https://github.com/gearcase/to-path) - Converts string to a property path array. 



## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/gearcase/object-set/issues/new).
