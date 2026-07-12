const test = require('ava');
const { randomUUID } = require('crypto');
const { encode, decode } = require('.');

test('encode produces a 22-char string with no padding', t => {
  const encoded = encode(randomUUID());

  t.is(encoded.length, 22);
  t.false(encoded.includes('='));
});

test('roundtrips the nil and max UUIDs', t => {
  const nil = '00000000-0000-0000-0000-000000000000';
  const max = 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  t.is(decode(encode(nil)), nil);
  t.is(decode(encode(max)), max);
  t.is(encode(nil), '.'.repeat(22));
});

test('encodes to a known d64 value', t => {
  t.is(encode('109156be-c4fb-41ea-b1b4-efe1671c5836'), '384LjgIvFTelhDzWOllNCV');
  t.is(decode('384LjgIvFTelhDzWOllNCV'), '109156be-c4fb-41ea-b1b4-efe1671c5836');
});

test('accepts uppercase hex, normalizes to lowercase', t => {
  const upper = '109156BE-C4FB-41EA-B1B4-EFE1671C5836';

  t.is(encode(upper), encode(upper.toLowerCase()));
  t.is(decode(encode(upper)), upper.toLowerCase());
});

test('preserves byte order lexicographically (sortable ids)', t => {
  const ids = Array.from({ length: 500 }, () => randomUUID());
  const byRaw = [...ids].sort();
  const byEncoded = [...ids].sort((a, b) => (encode(a) < encode(b) ? -1 : encode(a) > encode(b) ? 1 : 0));

  t.deepEqual(byEncoded, byRaw);
});

test('roundtrips 50k random UUIDs', t => {
  for (let i = 0; i < 50000; i++) {
    const id = randomUUID();
    t.is(decode(encode(id)), id);
  }
});
