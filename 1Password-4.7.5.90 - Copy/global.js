var f, aa = 'function' == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (c.get || c.set) throw new TypeError('ES3 does not support getters and setters.');
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};

function ea() {
  ba();
  var a = n.Symbol.iterator;
  a || (a = n.Symbol.iterator = n.Symbol('iterator'));
  'function' != typeof Array.prototype[a] && aa(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function() {
      return y(this);
    }
  });
}

function q(a, b) {
  if (b) {
    var c = n;
    a = a.split('.');
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && aa(c, a, {
      configurable: !0,
      writable: !0,
      value: b
    });
  }
}

q('Promise', function(a) {
  function b(a) {
    this.fa = 0;
    this.Sa = void 0;
    this.aa = [];
    var b = this.Ka();
    try {
      a(b.resolve, b.reject);
    } catch (l) {
      b.reject(l);
    }
  }
  function c() {
    this.G = null;
  }
  if (a) return a;
  c.prototype.mb = function() {
    try {
      c();
    } catch (k) {
      this.Zb(k);
    }
  };
  this.G = null;
};
c.prototype.Zb = function(a) {
  this.nb(function() {
    throw a;
  });
};
b.prototype.Ka = function() {
  function a(a) {
    return function(d) {
      c || (c = !0, a.call(b, d));
    };
  }
  var b = this,
    c = !1;
  return {
    resolve: a(this.Za),
    reject: a(this.Zb)
  };
};
b.prototype.Jc = function(a) {
  var b = void 0;
  try {
    b = a.then;
  } catch (l) {
    this.Qa(l);
    return;
  }
  'function' == typeof b ? this.Uc(b, a) : this.Eb(a);
};
b.prototype.Qa = function(a) {
  this.Tb(2, a);
};
b.prototype.Eb = function(a) {
  this.Tb(1, a);
};
b.prototype.Tb = function(a, b) {
  switch (a) {
    case 1:
      this.fa = 1;
      this.Sa = b;
      break;
    case 2:
      this.fa = 2;
      this.Sa = b;
      break;
    default:
      throw Error('Invalid state');
  }
  this.nb();
};
b.prototype.nb = function(a) {
  if (null == this.aa) a();
  else {
    var b = this;
    this.aa.push(function() {
      a.call(b);
    });
  }
};
b.prototype.Uc = function(a, b) {
  var c = this.Ka();
  try {
    a.call(b, c.resolve, c.reject);
  } catch (k) {
    c.reject(k);
  }
};
b.prototype.then = function(a, c) {
  function d(a) {
    return 'function' == typeof a ? a : function(a) {
      return a;
    };
  }
  var e = new b(function(b, c) {
    a = d(a);
    c = d(c);
    switch (this.fa) {
      case 1:
        e.mb(a);
        break;
      case 2:
        e.mb(c);
        break;
      default:
        this.aa.push(function() {
          e.mb(a);
        });
    }
  });
  return e;
};
b.resolve = function(a) {
  return a instanceof b ? a : new b(function(b) {
    b(a);
  });
};
b.reject = function(a) {
  return new b(function(b, c) {
    c(a);
  });
};
b.prototype.catch = function(a) {
  return this.then(null, a);
};
return b;
});

function la(a, b, c) {
  if (null == a) throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
  if (a instanceof RegExp) throw new TypeError('First argument to String.prototype.includes must not be a RegExp');
  return -1 !== this.indexOf(a, c || 0);
}

q('String.prototype.includes', function(a) {
  return a ? a : function(a, c) {
    return -1 !== la(this, a, 'includes').indexOf(a, c || 0);
  };
});
q('String.prototype.endsWith', function(a) {
  return a ? a : function(a, c) {
    var b = la(this, a, 'endsWith');
    void 0 === c && (c = b.length);
    return b.substring(c - a.length, c) === a;
  };
});

function ma(a, b) {
  ea();
  a instanceof String && (a += '');
  var c = 0,
    d = {
      next: function() {
        if (c < a.length) {
          var e = c++;
          return {
            value: b(e, a[e]),
            done: !1
          };
        }
        d.next = function() {
          return {
            done: !0,
            value: void 0
          };
        };
        return d.next();
      }
    };
  return d;
}

q('Array.prototype.findIndex', function(a) {
  return a ? a : function(a, c) {
    a: {
      var b = this;
      b instanceof String && (b = String(b));
      for (var e = b.length, g = 0; g < e; g++)
        if (a.call(c, b[g], g, b)) {
          a = g;
          break a;
        }
      a = -1;
    }
    return a;
  };
});

var t = new function() {
  return {
    I: function() {
      function a() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1).toUpperCase();
      }
      return [a(), a(), a(), a(), a(), a(), a(), a()].join('');
    }
  };
};

var sa = {
  ac: {
    r: 'co.us gov'
  },
  ad: {
    r: ['nom']
  },
  ae: {
    r: ['co']
  },
  af: {
    r: 'gov com org net edu nom'.split(' ')
  },
  ag: {
    r: ['com', 'org', 'net', 'nom', 'co']
  },
  ai: {
    r: ['off', 'com', 'net', 'org', 'nom']
  },
  al: {
    r: 'blogspot edu gov mil net org com nom'.split(' ')
  },
  am: {
    r: ['blogspot']
  },
  ar: {
    r: 'com org gov edu net nom'.split(' ')
  },
  as: {
    r: 'gov edu mil org com net nom'.split(' ')
  },
  at: {
    r: 'co.gov or.us'.split(' ')
  },
  au: {
    r: 'blogspot.com act.edu nsw.edu vic.edu qld.edu tas.edu qld.gov vic.gov tas.gov wa.edu nt.edu sa.edu wa.gov sa.gov nt.gov edu.au nsw.gov org'.split(' ')
  },
  aw: {
    r: ['com', 'org', 'net', 'edu', 'gov']
  },
  az: {
    r: 'gov com org net edu nom'.split(' ')
  },
  ba: {
    r: 'gov com org net edu nom'.split(' ')
  },
  bb: {
    r: ['com', 'org', 'net', 'edu', 'gov']
  },
  bd: {
    r: 'gov com org net edu nom'.split(' ')
  },
  be: {
    r: 'gov com org net edu nom'.split(' ')
  },
  bf: {
    r: ['gov']
  },
  bg: {
    r: 'blogspot barsy c d e f g h i j k l m n o p q r s a u v w x y z 0 1 2 3 4 5 6 7 8 9 t b'.split(' ')
  },
  bh: {
    r: ['com', 'edu', 'net', 'org', 'gov']
  },
  bi: {
    r: ['com', 'edu', 'net', 'org', 'gov']
  },
  bj: {
    r: 'com org net gov edu nom'.split(' ')
  },
  bm: {
    r: ['com', 'edu', 'net', 'org', 'gov']
  },
  bn: {
    r: 'com org net gov edu nom'.split(' ')
  },
  bo: {
    r: 'com org gov edu net nom'.split(' ')
  },
  br: {
    r: 'campinagrande blogspot.com saobernardo santamaria santoandre riobranco joinville aparecida campinas contagem sorocaba saogonca salvador riopreto ribeirao londrina boavista curitiba floripa'.split(' ')
  },
  bs: {
    r: 'com net org edu gov we'.split(' ')
  },
  bt: {
    r: ['com', 'edu', 'gov', 'net', 'org']
  },
  bv: {},
  bw: {
    r: ['org', 'co']
  },
  by: {
    r: 'blogspot.com gov mil com nym of'.split(' ')
  },
  bz: {
    r: 'com net org edu gov nom'.split(' ')
  },
  cd: {
    r: ['gov']
  },
  cf: {
    r: ['blogspot']
  },
  cg: {},
  ch: {
    r: 'linkyard-cloud lima-city blogspot square7 dnsking gotdns 4lima 12hp 2ix'.split(' ')
  },
  ci: {
    r: 'aéroport presse gouv asso net com edu org int ac ed or'.split(' ')
  },
  ck: {},
  cl: {
    r: 'gob gov com org net edu mil nom'.split(' ')
  },
  cm: {
    r: 'gov com org net edu nom'.split(' ')
  },
  cn: {
    r: 'com edu gov mil net org'.split(' ')
  },
  co: {
    r: 'blogspot.com leadpages lpages go-vip nodum arts firm info mypi net org rec web mil int gov edu com n4t nom'.split(' '),
    w: ['otap']
  },
  coop: {},
  cr: {
    r: 'ac co ed fi go or sa'.split(' ')
  },
  cu: {
    r: 'com edu org net gov inf'.split(' ')
  },
  cv: {
    r: ['blogspot']
  },
  cw: {
    r: ['com', 'org', 'net', 'edu', 'gov']
  },
  cx: {},
  cy: {
    r: 'com edu gov net org'.split(' ')
  },
  cz: {
    r: 'com org net gov edu nom'.split(' ')
  },
  de: {
    r: 'com org net gov edu nom'.split(' ')
  },
  dj: {},
  dk: {
    r: 'blogspot store firm biz reg co'.split(' ')
  },
  dm: {
    r: ['com', 'net', 'org', 'edu', 'gov']
  },
  'do': {
    r: 'web com edu gob gov mil net org sld art'.split(' ')
  },
  dz: {
    r: 'asso org net gov edu nom'.split(' ')
  },
  ec: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  ee: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  eg: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  er: {},
  es: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  et: {
    r: 'info name org edu biz com net gov'.split(' ')
  },
  eu: {
    r: 'wellbeingzone diskstation cloudns barsy spdns mycd'.split(' '),
    w: ['ent.1password', '1password', 'transurl'],
    e: ['start.ent.1password', 'my.ent.1password', 'start.1password', 'my.1password']
  },
  fi: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  fj: {},
  fm: {},
  fr: {
    r: 'nom prd com org gov net edu mil'.split(' ')
  },
  ga: {},
  gb: {},
  gd: {
    r: ['nom']
  },
  ge: {
    r: 'nom edu gov org mil net pvt com'.split(' ')
  },
  gf: {},
  gg: {
    r: ['net', 'org', 'cya', 'co']
  },
  gh: {
    r: ['com', 'edu', 'gov', 'org', 'mil']
  },
  gi: {
    r: 'com ltd gov mod edu org'.split(' ')
  },
  gl: {
    r: 'com org gov edu net nom'.split(' ')
  },
  gm: {
    r: 'com org edu gov net nom'.split(' ')
  },
  gn: {
    r: 'com org edu gov net nom'.split(' ')
  },
  gp: {},
  gq: {
    r: 'com org gov edu net nom'.split(' ')
  },
  gr: {
    r: 'com org edu gov net nom'.split(' ')
  },
  gt: {
    r: 'com org edu gov net nom'.split(' ')
  },
  gu: {
    r: ['com', 'edu', 'gov', 'net', 'org']
  },
  gw: {},
  gy: {
    r: 'com edu gov net org nym co'.split(' ')
  },
  hk: {
    r: 'blogspot edu gov idv net org com ltd inc 敎育 個人 个人 箇人 網络 网络 组織 網絡 网絡 组织 組織 組织 公司 教育'.split(' ')
  },
  hn: {
    r: 'com org gov edu net nom'.split(' ')
  },
  hr: {
    r: 'com org gov edu net nom'.split(' ')
  },
  ht: {
    r: 'com org gov edu net nom'.split(' ')
  },
  hu: {
    r: 'com org gov edu net nom'.split(' ')
  },
  id: {
    r: 'blogspot.co ponpes zone desa net biz mil sch web my go co ac or'.split(' ')
  },
  ie: {
    r: 'blogspot gov nym'.split(' ')
  },
  il: {
    r: 'blogspot.co muni idf k12 gov net org ac co'.split(' ')
  },
  im: {
    r: 'plc.co ltd gov org net com nom'.split(' ')
  },
  'int': {
    r: ['eu']
  },
  io: {
    r: 'cust.testing.thingdust cust.disrec.thingdust devices.resinstaging cust.prod.thingdust cust.dev.thingdust browsersafetymark applicationcloud customer.enonic azurecontainer s'.split(' ')
  },
  ir: {
    r: 'ايران ایران net gov org sch co ac id'.split(' ')
  },
  is: {
    r: 'blogspot cupcake edu gov net int org com'.split(' ')
  },
  it: {
    r: 'friuli-venezia-giulia barletta-trani-andria monza-e-della-bri'.split(' ')
  },
  je: {
    r: ['net', 'org', 'co']
  },
  jm: {
    w: ['']
  },
  jo: {
    r: 'name org net edu com gov mil sch'.split(' ')
  },
  jobs: {},
  jp: {
    r: 'higashihiroshima.hiroshima fujikawaguchiko.yamanashi higashimatsushima.miyagi ichikawamisa'.split(' '),
    w: 'kitakyushu kawasaki yokohama sapporo nagoya sendai kobe'.split(' '),
    e: 'city.kitakyushu city.kawasaki city.yokohama city.sapporo city.nagoya city.sendai city.kobe'.split(' ')
  },
  ke: {
    r: 'blogspot.co'.split(' ')
  },
  kg: {
    r: 'com org edu gov net mil nom'.split(' ')
  },
  kh: {},
  ki: {
    r: 'com org gov edu net mil nom'.split(' ')
  },
  kn: {
    r: 'com org gov edu net mil nom'.split(' ')
  },
  kp: {
    r: 'com edu gov org rep tra'.split(' ')
  },
  kr: {
    r: 'gyeongbuk gyeongnam blogspot chungbuk chungnam gyeonggi daejeon jeonnam jeonbuk incheon gwangju gangwon daegu busan seoul ulsan jeju mil kg re es'.split(' ')
  },
  kw: {
    r: 'com org gov edu net mil nom'.split(' ')
  },
  ky: {
    r: 'com org gov edu net mil nom'.split(' ')
  },
  kz: {
    r:
