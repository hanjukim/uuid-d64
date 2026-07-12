uuid-d64
=====
> Compression codec for uuid to d64 (22 bytes)

Encodes a 36-char UUID into a compact **22-char** string — ~39% shorter — using
the [d64](https://github.com/dominictarr/d64) alphabet instead of standard base64.

## Features

- **Shorter than base64.** 16 UUID bytes → 22 chars, with **no `=` padding**
  (standard base64 emits 24 chars including padding).
- **Any UUID version.** Works on any canonical 36-char UUID — v1, v4, v7, v8,
  plus the nil and max UUIDs. The codec treats the 16 bytes as opaque and never
  inspects version bits. Uppercase hex is accepted and normalized to lowercase.
- **Sort-order preserving.** The d64 alphabet is sorted by ASCII code, so the
  lexicographic order of encoded strings matches the byte order of the source
  UUIDs. Drop them straight into a database index or key and range scans still
  work — standard base64 (`A-Za-z0-9+/`) breaks this because `+`/`/` sort below
  digits and letters.
- **UUIDv7 friendly.** Because [UUIDv7](https://www.rfc-editor.org/rfc/rfc9562)
  is time-ordered and d64 preserves byte order, the encoded strings sort
  chronologically too — a compact, URL-safe, time-sortable id for database keys.
- **URL- & filename-safe.** The alphabet is `.` `_` plus `0-9A-Za-z` only — no
  `+`, `/`, or `=`, so encoded ids need no escaping in URLs, filenames, or paths.
- **Zero dependencies.** The codec is inlined and specialized for the fixed
  16-byte ↔ 22-char layout: no `Buffer` allocation, no runtime deps.
- **TypeScript-ready.** Ships with type definitions.

### d64 vs base64 at a glance

| Codec            | Alphabet          | Padding | Length | URL-safe | Sort-preserving |
| ---------------- | ----------------- | :-----: | :----: | :------: | :-------------: |
| standard base64  | `A-Za-z0-9+/`     |  `=`    |  24    |    no    |       no        |
| base64url        | `A-Za-z0-9-_`     |  none   |  22    |   yes    |       no        |
| **d64**          | `._0-9A-Za-z` †   |  none   |  22    |   yes    |     **yes**     |

† sorted by ASCII code — that ordering is what makes encoded ids sortable.

## Install
```
$ npm install uuid-d64
```

## Usage
```javascript
const { randomUUID } = require('crypto');
const { encode, decode } = require('uuid-d64');

const id = randomUUID();
const encoded = encode(id);
const decoded = decode(encoded);

console.log(id);
// => '109156be-c4fb-41ea-b1b4-efe1671c5836'
console.log(encoded);
// => '384LjgIvFTelhDzWOllNCV'  (22 chars)
console.log(decoded);
// => '109156be-c4fb-41ea-b1b4-efe1671c5836'
```

## API

Ships with TypeScript types. Import via ESM or CommonJS:

```ts
import { encode, decode } from 'uuid-d64';
// or: const { encode, decode } = require('uuid-d64');
```

### `encode(uuid: string): string`

Encodes a canonical RFC 4122 UUID (36-char, hyphenated) into a 22-char d64 string.

| Param  | Type     | Description                                      |
| ------ | -------- | ------------------------------------------------ |
| `uuid` | `string` | Hyphenated UUID, e.g. `109156be-c4fb-41ea-…`     |

**Returns** `string` — 22-char d64 encoding.

### `decode(d64: string): string`

Decodes a 22-char d64 string back into a canonical hyphenated UUID.

| Param | Type     | Description                        |
| ----- | -------- | --------------------------------- |
| `d64` | `string` | 22-char d64 string from `encode`. |

**Returns** `string` — canonical RFC 4122 UUID.

> **Zero dependencies.** The d64 codec is inlined and specialized for the fixed
> 16-byte UUID ↔ 22-char layout — no `Buffer` allocation, no runtime deps.

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
Fastest decoder is uuid-d64,uuid-base64p
```

## License
Source files are distributed under the MIT license found in the LICENSE file.
