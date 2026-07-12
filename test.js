const test = require('ava');
const { randomUUID } = require('crypto');
const { encode, decode } = require('.');

test('decoded data integrity', t => {
  const id = randomUUID();
  const encoded = encode(id);
  const decoded = decode(encoded);

  t.is(id, decoded);
});
