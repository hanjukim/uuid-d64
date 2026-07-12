"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
// d64 alphabet — sorted, byte-compatible with the original `d64` package.
const CHARS = '.PYFGCRLAOEUIDHTNSQJKXBMWVZ_pyfgcrlaoeuidhtnsqjkxbmwvz1234567890'
    .split('').sort().join('');
// d64 char code -> 6-bit index (replaces d64's codeToIndex).
const C2I = new Int8Array(128);
for (let i = 0; i < 64; i++)
    C2I[CHARS.charCodeAt(i)] = i;
// hex char code -> nibble.
const H2N = new Int8Array(128);
for (let i = 0; i < 10; i++)
    H2N[48 + i] = i;
for (let i = 0; i < 6; i++) {
    H2N[97 + i] = 10 + i;
    H2N[65 + i] = 10 + i;
}
// byte -> 2 hex chars.
const B2H = [];
for (let i = 0; i < 256; i++)
    B2H[i] = (i + 0x100).toString(16).slice(1);
const encode = (uuid) => {
    const n = H2N;
    const b0 = (n[uuid.charCodeAt(0)] << 4) | n[uuid.charCodeAt(1)];
    const b1 = (n[uuid.charCodeAt(2)] << 4) | n[uuid.charCodeAt(3)];
    const b2 = (n[uuid.charCodeAt(4)] << 4) | n[uuid.charCodeAt(5)];
    const b3 = (n[uuid.charCodeAt(6)] << 4) | n[uuid.charCodeAt(7)];
    const b4 = (n[uuid.charCodeAt(9)] << 4) | n[uuid.charCodeAt(10)];
    const b5 = (n[uuid.charCodeAt(11)] << 4) | n[uuid.charCodeAt(12)];
    const b6 = (n[uuid.charCodeAt(14)] << 4) | n[uuid.charCodeAt(15)];
    const b7 = (n[uuid.charCodeAt(16)] << 4) | n[uuid.charCodeAt(17)];
    const b8 = (n[uuid.charCodeAt(19)] << 4) | n[uuid.charCodeAt(20)];
    const b9 = (n[uuid.charCodeAt(21)] << 4) | n[uuid.charCodeAt(22)];
    const b10 = (n[uuid.charCodeAt(24)] << 4) | n[uuid.charCodeAt(25)];
    const b11 = (n[uuid.charCodeAt(26)] << 4) | n[uuid.charCodeAt(27)];
    const b12 = (n[uuid.charCodeAt(28)] << 4) | n[uuid.charCodeAt(29)];
    const b13 = (n[uuid.charCodeAt(30)] << 4) | n[uuid.charCodeAt(31)];
    const b14 = (n[uuid.charCodeAt(32)] << 4) | n[uuid.charCodeAt(33)];
    const b15 = (n[uuid.charCodeAt(34)] << 4) | n[uuid.charCodeAt(35)];
    const c = CHARS;
    return c[b0 >> 2] + c[((b0 & 3) << 4) | (b1 >> 4)] + c[((b1 & 0xf) << 2) | (b2 >> 6)] + c[b2 & 0x3f] +
        c[b3 >> 2] + c[((b3 & 3) << 4) | (b4 >> 4)] + c[((b4 & 0xf) << 2) | (b5 >> 6)] + c[b5 & 0x3f] +
        c[b6 >> 2] + c[((b6 & 3) << 4) | (b7 >> 4)] + c[((b7 & 0xf) << 2) | (b8 >> 6)] + c[b8 & 0x3f] +
        c[b9 >> 2] + c[((b9 & 3) << 4) | (b10 >> 4)] + c[((b10 & 0xf) << 2) | (b11 >> 6)] + c[b11 & 0x3f] +
        c[b12 >> 2] + c[((b12 & 3) << 4) | (b13 >> 4)] + c[((b13 & 0xf) << 2) | (b14 >> 6)] + c[b14 & 0x3f] +
        c[b15 >> 2] + c[(b15 & 3) << 4];
};
exports.encode = encode;
const decode = (d64str) => {
    const d = C2I, h = B2H;
    const v0 = d[d64str.charCodeAt(0)], v1 = d[d64str.charCodeAt(1)], v2 = d[d64str.charCodeAt(2)], v3 = d[d64str.charCodeAt(3)];
    const v4 = d[d64str.charCodeAt(4)], v5 = d[d64str.charCodeAt(5)], v6 = d[d64str.charCodeAt(6)], v7 = d[d64str.charCodeAt(7)];
    const v8 = d[d64str.charCodeAt(8)], v9 = d[d64str.charCodeAt(9)], v10 = d[d64str.charCodeAt(10)], v11 = d[d64str.charCodeAt(11)];
    const v12 = d[d64str.charCodeAt(12)], v13 = d[d64str.charCodeAt(13)], v14 = d[d64str.charCodeAt(14)], v15 = d[d64str.charCodeAt(15)];
    const v16 = d[d64str.charCodeAt(16)], v17 = d[d64str.charCodeAt(17)], v18 = d[d64str.charCodeAt(18)], v19 = d[d64str.charCodeAt(19)];
    const v20 = d[d64str.charCodeAt(20)], v21 = d[d64str.charCodeAt(21)];
    return h[(v0 << 2) | (v1 >> 4)] + h[((v1 & 0xf) << 4) | (v2 >> 2)] + h[((v2 & 3) << 6) | v3] + h[(v4 << 2) | (v5 >> 4)] + '-' +
        h[((v5 & 0xf) << 4) | (v6 >> 2)] + h[((v6 & 3) << 6) | v7] + '-' +
        h[(v8 << 2) | (v9 >> 4)] + h[((v9 & 0xf) << 4) | (v10 >> 2)] + '-' +
        h[((v10 & 3) << 6) | v11] + h[(v12 << 2) | (v13 >> 4)] + '-' +
        h[((v13 & 0xf) << 4) | (v14 >> 2)] + h[((v14 & 3) << 6) | v15] + h[(v16 << 2) | (v17 >> 4)] +
        h[((v17 & 0xf) << 4) | (v18 >> 2)] + h[((v18 & 3) << 6) | v19] + h[(v20 << 2) | (v21 >> 4)];
};
exports.decode = decode;
//# sourceMappingURL=index.js.map