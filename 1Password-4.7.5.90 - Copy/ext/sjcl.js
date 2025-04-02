"use strict";

var sjcl = {
  cipher: {},
  hash: {},
  keyexchange: {},
  mode: {},
  misc: {},
  codec: {},
  exception: {
    corrupt: function (a) {
      this.toString = function () {
        return "CORRUPT: " + this.message;
      };
      this.message = a;
    },
    invalid: function (a) {
      this.toString = function () {
        return "INVALID: " + this.message;
      };
      this.message = a;
    },
    bug: function (a) {
      this.toString = function () {
        return "BUG: " + this.message;
      };
      this.message = a;
    },
    notReady: function (a) {
      this.toString = function () {
        return "NOT READY: " + this.message;
      };
      this.message = a;
    }
  }
};

if (typeof module != "undefined" && module.exports) module.exports = sjcl;

sjcl.cipher.aes = function (a) {
  this.o[0][0][0] || this.r();
  var b, c, d, e, f = this.o[0][4],
    g = this.o[1];
  b = a.length;
  var h = 1;
  if (b !== 4 && b !== 6 && b !== 8) throw new sjcl.exception.invalid("invalid aes key size");
  this.d = [a.slice(0), []];
  for (a = this.d[1], c = 0; c < b * 4 + 28; c++) {
    d = this.d[0][c - 1];
    if (c % b === 0 || b === 8 && c % b === 4) {
      d = f[d >>> 24] << 24 ^ f[d >> 16 & 255] << 16 ^ f[d >> 8 & 255] << 8 ^ f[d & 255];
      if (c % b === 0) {
        d = d << 8 ^ d >>> 24 ^ h << 24;
        h = h << 1 ^ 283 * (h >> 7);
      }
    }
    this.d[0][c] = this.d[0][c - b] ^ d;
  }
  for (b = a.length = this.d[0].length, c = 0; c < b; c++) {
    d = this.d[0][c];
    a[c] = c < 4 || c >= b - 4 ? d : g[0][f[d >>> 24]] ^ g[1][f[d >> 16 & 255]] ^ g[2][f[d >> 8 & 255]] ^ g[3][f[d & 255]];
  }
};

sjcl.cipher.aes.prototype = {
  encrypt: function (a) {
    return this.N(a, 0);
  },
  decrypt: function (a) {
    return this.N(a, 1);
  },
  o: [
    [
      [],
      [],
      [],
      [],
      []
    ],
    [
      [],
      [],
      [],
      [],
      []
    ]
  ],
  r: function () {
    var a = this.o[0],
      b = this.o[1],
      c = a[4],
      d = b[4],
      e, f, g, h, i = [],
      j = [],
      k, l, m, n;
    for (e = 0; e < 256; e++) {
      j[(i[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
    }
    for (f = g = 0; !c[g]; g ^= k || 1, f = j[f] || 1) {
      m = f ^ f << 1 ^ f << 2 ^ f << 3 ^ f << 4;
      m = m >> 8 ^ m & 255 ^ 99;
      c[g] = m;
      d[m] = g;
      h = i[e = i[k = i[f]]];
      l = 16843009 * h ^ 65537 * e ^ 257 * k ^ 16843008 * f;
      h = 257 * i[m] ^ 16843008 * m;
      for (e = 0; e < 4; e++) {
        a[e][g] = h = h << 24 ^ h >>> 8;
        b[e][m] = l = l << 24 ^ l >>> 8;
      }
    }
    for (e = 0; e < 5; e++) {
      a[e] = a[e].slice(0);
      b[e] = b[e].slice(0);
    }
  },
  N: function (a, b) {
    if (a.length !== 4) throw new sjcl.exception.invalid("invalid aes block size");
    var c = this.d[b],
      d = a[0] ^ c[0],
      e = a[b ? 3 : 1] ^ c[1],
      f = a[2] ^ c[2],
      g = a[b ? 1 : 3] ^ c[3],
      h, i, j, k = c.length / 4 - 2,
      l, m = 4,
      n = [0, 0, 0, 0];
    for (h = 0; h < k; h++) {
      i = this.o[b][0][d >>> 24] ^ this.o[b][1][e >> 16 & 255] ^ this.o[b][2][f >> 8 & 255] ^ this.o[b][3][g & 255] ^ c[m];
      j = this.o[b][0][e >>> 24] ^ this.o[b][1][f >> 16 & 255] ^ this.o[b][2][g >> 8 & 255] ^ this.o[b][3][d & 255] ^ c[m + 1];
      l = this.o[b][0][f >>> 24] ^ this.o[b][1][g >> 16 & 255] ^ this.o[b][2][d >> 8 & 255] ^ this.o[b][3][e & 255] ^ c[m + 2];
      g = this.o[b][0][g >>> 24] ^ this.o[b][1][d >> 16 & 255] ^ this.o[b][2][e >> 8 & 255] ^ this.o[b][3][f & 255] ^ c[m + 3];
      m += 4;
      d = i;
      e = j;
      f = l;
    }
    for (h = 0; h < 4; h++) {
      n[b ? 3 & -h : h] = this.o[b][0][d >>> 24] << 24 ^ this.o[b][1][e >> 16 & 255] << 16 ^ this.o[b][2][f >> 8 & 255] << 8 ^ this.o[b][3][g & 255] ^ c[m++];
      i = d;
      d = e;
      e = f;
      f = g;
      g = i;
    }
    return n;
  }
};

sjcl.bitArray = {
  bitSlice: function (a, b, c) {
    a = sjcl.bitArray.T(a.slice(b / 32), 32 - (b & 31)).slice(1);
    return c === undefined ? a : sjcl.bitArray.clamp(a, c - b);
  },
  extract: function (a, b, c) {
    var d = Math.floor(-b - c & 31);
    return ((b + c - 1 ^ b) & -32 ? (a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d) : a[b / 32 | 0] >>> d) & (1 << c) - 1;
  },
  concat: function (a, b) {
    if (a.length === 0 || b.length === 0) return a.concat(b);
    var c = a[a.length - 1],
      d = sjcl.bitArray.getPartial(c);
    return d === 32 ? a.concat(b) : sjcl.bitArray.T(b, d, c | 0, a.slice(0, a.length - 1));
  },
  bitLength: function (a) {
    if (a.length === 0) return 0;
    return (a.length - 1) * 32 + sjcl.bitArray.getPartial(a[a.length - 1]);
  },
  clamp: function (a, b) {
    if (a.length * 32 < b) return a;
    a = a.slice(0, Math.ceil(b / 32));
    var c = a.length;
    b &= 31;
    if (c > 0 && b) a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1);
    return a;
  },
  partial: function (a, b, c) {
    if (a === 32) return b;
    return (c ? b | 0 : b << 32 - a) + a * 0x10000000000;
  },
  getPartial: function (a) {
    return Math.round(a / 0x10000000000) || 32;
  },
  equal: function (a, b) {
    if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return false;
    var c = 0,
      d;
    for (d = 0; d < a.length; d++) c |= a[d] ^ b[d];
    return c === 0;
  },
  T: function (a, b, c, d) {
    var e;
    e = 0;
    if (d === undefined) d = [];
    for (; b >= 32; b -= 32) {
      d.push(c);
      c = 0;
    }
    if (b === 0) return d.concat(a);
    for (e = 0; e < a.length; e++) {
      d.push(c | a[e] >>> b);
      c = a[e] << 32 - b;
    }
    e = a.length ? a[a.length - 1] : 0;
    a = sjcl.bitArray.getPartial(e);
    d.push(sjcl.bitArray.partial(b + a & 31, b + a > 32 ? c : d.pop(), 1));
    return d;
  },
  l: function (a, b) {
    return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
  }
};

sjcl.codec.utf8String = {
  fromBits: function (a) {
    var b = "",
      c = sjcl.bitArray.bitLength(a),
      d, e;
    for (d = 0; d < c / 8; d++) {
      if ((d & 3) === 0) e = a[d / 4];
      b += String.fromCharCode(e >>> 24);
      e <<= 8;
    }
    return decodeURIComponent(escape(b));
  },
  toBits: function (a) {
    a = unescape(encodeURIComponent(a));
    var b = [],
      c, d = 0;
    for (c = 0; c < a.length; c++) {
      d = d << 8 | a.charCodeAt(c);
      if ((c & 3) === 3) {
        b.push(d);
        d = 0;
      }
    }
    c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));
    return b;
  }
};

sjcl.codec.hex = {
  fromBits: function (a) {
    var b = "",
      c;
    for (c = 0; c < a.length; c++) b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4);
    return b.substr(0, sjcl.bitArray.bitLength(a) / 4);
  },
  toBits: function (a) {
    var b, c = [],
      d;
    a = a.replace(/\s|0x/g, "");
    d = a.length;
    a += "00000000";
    for (b = 0; b < a.length; b += 8) c.push(parseInt(a.substr(b, 8), 16) ^ 0);
    return sjcl.bitArray.clamp(c, d * 4);
  }
};

sjcl.codec.base64 = {
  K: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  fromBits: function (a, b, c) {
    var d = "",
      e = 0,
      f = sjcl.codec.base64.K,
      g = 0,
      h = sjcl.bitArray.bitLength(a);
    if (c) f = f.substr(0, 62) + "-_";
    for (c = 0; 6 * d.length < h;) {
      d = (d << 8) + (a[c / 32 | 0] >>> 24 - c % 32 & 255);
      for (e += 8; e >= 6;) {
        d = d << 6 | d >>> e - 6 & 63;
        d = sjcl.codec.base64.K.charAt(d);
        e -= 6;
      }
      c += 8;
    }
    for (; e > 0;) d = d << 6 | d >>> e - 6 & 63;
    return d + "====".slice((d.length & 3) % 4 || 4);
  },
  toBits: function (a) {
    a = a.replace(/\s|=/g, "");
    var b, c = [],
      d, e = 0,
      f = 0;
    for (b = 0; b < a.length; b++) {
      d = sjcl.codec.base64.K.indexOf(a.charAt(b));
      if (d < 0) throw new sjcl.exception.invalid("this isn't base64: '" + a.charAt(b) + "', " + b + " -- " + a.length);
      f = f << 6 | d;
      if (e += 6) {
        c.push(f >>> e - 8 & 255);
        e -= 8;
      }
    }
    return c;
  }
};

sjcl.codec.bytes = {
  fromBits: function (a) {
    var b = [],
      c = sjcl.bitArray.bitLength(a),
      d, e;
    for (d = 0; d < c / 8; d++) {
      if ((d & 3) === 0) e = a[d / 4];
      b.push(e >>> 24);
      e <<= 8;
    }
    return b;
  },
  toBits: function (a) {
    var b = [],
      c, d = 0;
    for (c = 0; c < a.length; c++) {
      d = d << 8 | a[c];
      if ((c & 3) === 3) {
        b.push(d);
        d = 0;
      }
    }
    c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));
    return b;
  }
};

sjcl.hash.sha256.prototype = {
  blockSize: 512,
  reset: function () {
    this.c = this.l.slice(0);
    this.b = [];
    this.a = 0;
    return this;
  },
  update: function (a) {
    if (typeof a === "string") a = sjcl.codec.utf8String.toBits(a);
    var b, c = this.b = sjcl.bitArray.concat(this.b, a);
    b = sjcl.bitArray.bitLength(c);
    a = 0;
    for (b = b / 512; a < b; a++) {
      this.g(c.splice(0, 16));
    }
    return this;
  },
  finalize: function () {
    var a, b = this.c,
      c = this.b,
      d = sjcl.bitArray,
      e = this.a,
      f = d.bitLength(c);
    c = d.concat(c, [0x80000000]);
    for (a = c.length + 2; a % 16; a++) c.push(0);
    c.push(Math.floor(e / 0x100000000));
    c.push(e);
    for (a = 0; a < c.length;) this.g(c.splice(0, 16));
    this.reset();
    return b;
  },
  l: [],
  d: [],
  r: function () {
    function a(e) {
      return (e - Math.floor(e)) * 0x100000000 | 0;
    }
    var b = 0,
      c = 2,
      d;
    a: for (; b < 64; c++) {
      for (d = 2; d * d <= c; d++) {
        if (c % d === 0) continue a;
      }
      if (b < 8) this.l[b] = a(Math.pow(c, 0.5));
      this.d[b] = a(Math.pow(c, 1 / 3));
      b++;
    }
  },
  g: function (a) {
    var b, c, d, e, f, g, h, i, j, k = a.slice(0),
      l = this.c,
      m = this.d,
      n = l[0],
      o = l[1],
      p = l[2],
      q = l[3],
      r = l[4],
      s = l[5],
      t = l[6],
      u = l[7];
    for (a = 0; a < 64; a++) {
      if (a < 16) b = k[a];
      else {
        b = k[a + 1 & 15];
        c = k[a + 14 & 15];
        b = k[a & 15] += (b
