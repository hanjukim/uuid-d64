const { Suite } = require('benchmark');
const { randomUUID } = require('crypto');
const d64 = require('.');
const base64 = require('uuid-base64');
const slugid = require('slugid');

const uuids = [];
const d64s = [];
const slugids = [];

for (let i = 0; i < 100; i += 1) {
  uuids.push(randomUUID());
  d64s.push(d64.encode(uuids[uuids.length - 1]));
  slugids.push(slugid.encode(uuids[uuids.length - 1]));
}

let index = 0;

new Suite('encoder', { minTime: 3000 })
  .add('check', function() {
    if (d64.encode(uuids[index % 100]) !== base64.encode(uuids[index % 100])) throw new Error('panic');
    index += 1;
  })
  .add('uuid-d64', function() {
    d64.encode(uuids[index % 100]);
    index += 1;
  })
  .add('uuid-base64', function() {
    base64.encode(uuids[index % 100]);
    index += 1;
  })
  .add('slugid', function() {
    slugid.encode(uuids[index % 100]);
    index += 1;
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    index = 0;
  })
  .on('complete', function() {
    console.log('Fastest encoder is ' + this.filter('fastest').map('name'));
  })
  .run();

index = 0;

new Suite('decoder', { minTime: 3000 })
  .add('check', function() {
    if (d64.decode(d64s[index % 100]) !== base64.decode(d64s[index % 100])) throw new Error('panic');
    index += 1;
  })
  .add('uuid-d64', function() {
    base64.decode(d64s[index % 100]);
    index += 1;
  })
  .add('uuid-base64', function() {
    d64.decode(d64s[index % 100]);
    index += 1;
  })
  .add('slugid', function() {
    slugid.decode(slugids[index % 100]);
    index += 1;
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
    index = 0;
  })
  .on('complete', function() {
    console.log('Fastest decoder is ' + this.filter('fastest').map('name'));
  })
  .run();
