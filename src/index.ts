import * as d64 from 'd64';

const _bytesToHex: string[] = [];

for (let i = 0; i < 256; i++) {
  _bytesToHex[i] = (i + 0x100).toString(16).substr(1);
}

export const encode = (uuid: string): string => {
  return d64.encode(Buffer.from(uuid.split('-').join(''), 'hex'));
}

export const decode = (d64str: string): string => {
  let i = 0;
  const bth = _bytesToHex;
  const buf = d64.decode(d64str);

  return bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]];
}
