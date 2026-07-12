uuid-d64
=====
> Compression codec for uuid to d64 (22 bytes)

## Install
```
$ npm install uuid-d64
```

## Usage
```javascript
const { encode, decode } = require('uuid-d64');

const id = uuid();
const encoded = encode(id);
const decoded = decode(encoded);

console.log(id);
console.log(encoded);
console.log(decoded);
```

## API

### encode(str)
Encodes uuid to d64

### decode(str)
Decodes d64 to uuid

#### str
Type: `String`

## Benchmark
```
$ node bench.js
check x 235,406 ops/sec ±1.00% (88 runs sampled)
uuid-d64 x 690,540 ops/sec ±0.81% (96 runs sampled)
uuid-base64 x 395,159 ops/sec ±0.91% (91 runs sampled)
slugid x 322,243 ops/sec ±20.00% (93 runs sampled)
Fastest encoder is uuid-d64
check x 444,387 ops/sec ±1.11% (88 runs sampled)
uuid-d64 x 1,244,674 ops/sec ±1.58% (86 runs sampled)
uuid-base64 x 1,221,695 ops/sec ±1.68% (83 runs sampled)
slugid x 1,006,900 ops/sec ±0.45% (91 runs sampled)
Fastest decoder is uuid-d64,uuid-base64
```

## License
Source files are distributed under the MIT license found in the LICENSE file.
