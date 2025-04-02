var ba = 'function' == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (c.get || c.set) throw new TypeError('ES3 does not support getters and setters.');
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};

function x() {
  w();
  var a = v.Symbol.iterator;
  a || (a = v.Symbol.iterator = v.Symbol('iterator'));
  'function' != typeof Array.prototype[a] && ba(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function() {
      return y(this);
    }
  });
}

function A(a, b) {
  if (b) {
    var c = v;
    a = a.split('.');
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && ba(c, a, {
      configurable: !0,
      writable: !0,
      value: b
    });
  }
}

A('String.prototype.includes', function(a) {
  return a ? a : function(a, c) {
    if (null == this) throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
    if (a instanceof RegExp) throw new TypeError('First argument to String.prototype.includes must not be a RegExp');
    return -1 !== this.indexOf(a, c || 0);
  };
});

A('WeakMap', function(a) {
  function b(a) {
    this.l = (f += Math.random() + 1).toString();
    if (a) {
      w();
      x();
      a = z(a);
      for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1]);
    }
  }
  function c(a) {
    C(a, e) || ba(a, e, {
      value: {}
    });
  }
  var e = '$jscomp_hidden_' + Math.random().toString().substring(2);
  d('freeze');
  d('preventExtensions');
  d('seal');
  var f = 0;
  b.prototype.set = function(a, b) {
    c(a);
    if (!C(a, e)) throw Error('WeakMap key fail: ' + a);
    a[e][this.l] = b;
    return this;
  };
  b.prototype.get = function(a) {
    return C(a, e) ? a[e][this.l] : void 0;
  };
  b.prototype.has = function(a) {
    return C(a, e) && this.l in a[e];
  };
  b.prototype.delete = function(a) {
    return C(a, e) && this.l in a[e] ? delete a[e][this.l] : !1;
  };
  return b;
});

A('Map', function(a) {
  function b() {
    var a = {};
    return a.f = a.next = a.head = a;
  }
  function c(a, b) {
    var c = a.b;
    return fa(function() {
      if (c) {
        for (; c.head != a.b;) c = c.f;
        for (; c.next != c.head;) return c = c.next, {
          done: !1,
          value: c
        };
        c = null;
      }
      return {
        done: !0,
        value: void 0
      };
    });
  }
  function e(a) {
    this.j = {};
    this.b = b();
    this.size = 0;
    if (a) {
      a = z(a);
      for (var c; !(c = a.next()).done;) c = c.value, this.set(c[0], c[1]);
    }
  }
  if (function() {
      if (!a || !a.prototype.entries || 'function' != typeof Object.seal) return !1;
      try {
        var b = Object.seal({}),
          c = Object.seal({}),
          d = new a([[b, 2], [c, 3]]);
        if (2 != d.get(b) || 3 != d.get(c) || 2 != d.size || d.get(b) != d.get(c)) return !1;
        var e = d.entries(),
          f = e.next();
        if (f.done || f.value[0] != b || 2 != f.value[1]) return !1;
        f = e.next();
        return f.done || f.value[0] != c || 3 != f.value[1] || !e.next().done ? !1 : !0;
      } catch (L) {
        return !1;
      }
    }()) return a;
  w();
  x();
  var f = new WeakMap;
  e.prototype.set = function(a, b) {
    var c = d(this, a);
    c.list || (c.list = this.j[c.id] = []);
    c.entry ? c.entry.value = b : (c.entry = {
      next: this.b,
      head: this.b,
      key: a,
      value: b
    }, c.list.push(c.entry), this.b = this.b.next = c.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(a) {
    var b = d(this, a);
    return b.entry && b.list ? (b.list.splice(b.index, 1), b.list.length || delete this.j[b.id], b.entry.next = b.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this.j = {};
    this.b = this.b.f = b();
    this.size = 0;
  };
  e.prototype.has = function(a) {
    return !!d(this, a).entry;
  };
  e.prototype.get = function(a) {
    return (a = d(this, a).entry) && a.value;
  };
  e.prototype.entries = function() {
    return c(this);
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var g = 0;
  return e;
});

A('Set', function(a) {
  function b(a) {
    this.a = new Map;
    if (a) {
      a = z(a);
      for (var b; !(b = a.next()).done;) this.add(b.value);
    }
    this.size = this.a.size;
  }
  if (function() {
      if (!a || !a.prototype.entries || 'function' != typeof Object.seal) return !1;
      try {
        var b = Object.seal({}),
          c = new a([b]);
        if (!c.has(b) || 1 != c.size || c.add(b) != c || 1 != c.size || c.add({}) != c || 2 != c.size) return !1;
        var d = c.entries(),
          e = d.next();
        if (e.done || e.value[0] != b || e.value[1] != b) return !1;
        e = d.next();
        return !e.done ? !1 : !0;
      } catch (g) {
        return !1;
      }
    }()) return a;
  w();
  x();
  b.prototype.add = function(a) {
    this.a.set(a, a);
    this.size = this.a.size;
    return this;
  };
  b.prototype.delete = function(a) {
    a = this.a.delete(a);
    this.size = this.a.size;
    return a;
  };
  b.prototype.clear = function() {
    this.a.clear();
    this.size = this.a.size;
  };
  b.prototype.has = function(a) {
    return this.a.has(a);
  };
  b.prototype.entries = function() {
    return this.a.entries();
  };
  b.prototype[Symbol.iterator] = b.prototype.entries;
  return b;
});

var D = {};
window.OnePassword = D;
D.h = {};
D.URLTools = D.h;
D.h.K = function(a) {
  return (a = new URL(a)) ? a.origin + a.pathname : '';
};

function ha(a) {
  var b = a.value,
    c = a.ownerDocument.createEvent('HTMLEvents'),
    d = a.ownerDocument.createEvent('HTMLEvents');
  a.dispatchEvent(H('keydown'));
  a.dispatchEvent(H('keypress'));
  a.dispatchEvent(H('keyup'));
  a.dispatchEvent(H('input'));
  a.dispatchEvent(H('change'));
}

function J(a, b, c) {
  var d = null;
  a && a.attributes && (d = (d = a.attributes[b]) ? d.value : null);
  return (a = d) && c.test(a);
}

function ia() {
  var a = /((\b|_|-)pin(\b|_|-)|password|passwort|kennwort|passe|contraseña|senha|mot de passe|пароль|密码|סיסמה|पासवर्ड|パスワード|암호|رمز عبور|كلمه السر|كلمة المرور)/i;
  return function(b) {
    return J(b, 'type', a) || J(b, 'name', a) || J(b, 'id', a) || J(b, 'placeholder', a) || J(b, 'label', a);
  };
}

function ka(a) {
  var b = /^(?:\W*(log\W*[oi]n|sign\W*[oi]n|continue|submit|weiter|accès|вход|connexion|entrar|anmelden|accedi|valider|登录|ログイン|로그인|登录|تسجيل الدخول|تسجيل الدخول|ट्रेड|登录))\W*$/i;
  return function(c) {
    return J(c, 'type', b) || J(c, 'name', b) || J(c, 'id', b) || J(c, 'placeholder', b) || J(c, 'label', b);
  };
}

function ma(a) {
  var b = /^(?:\W*(register|sign up|signup|join|create (my )?(account|profile)|регистрация|inscription|regístrate|cadastre-se|registrieren|registrazione|注册|साइन अप|サインアップ|가입|تسجيل|تسجيل|الاشتراك|تسجيل|الاشتراك))\W*$/i;
  return function(c) {
    return J(c, 'type', b) || J(c, 'name', b) || J(c, 'id', b) || J(c, 'placeholder', b) || J(c, 'label', b);
  };
}

window.BACK_TITLES = ['back', 'назад'];
var na = ['button', 'btn-primary'];
window.DIVITIS_BUTTON_CLASSES = na;

function O(a, b, c) {
  var d;
  if (!a || '' == a) return !1;
  d = a.toLowerCase().replace(/\s{2,}/g, ' ').replace(/^\s+|\s+$/g, '');
  return b(d, c);
}

function pa(a) {
  var b, c, d;
  if (!a || '' == a) return !1;
  b = 'submit';
  0 === b.constructor.toString().indexOf('function String()') && (b = [], b.push('submit'));
  a = a.replace(/^\s+/m, '').replace(/\s+$/m, '').replace(/\s{2,}/g, ' ');
  for (c = 0; c < b.length; c++) if (O(a, b[c])) return !0;
  return !1;
}

function Q(a) {
  var b = null;
  a && (b = a.replace(/^\s+|\s+$|\r?\n.*$/mg, '').replace(/\s{2,}/, ' '), b = 0 < b.length ? b : null);
  return b;
}

function ra(a, b) {
  var c = '';
  3 === b.nodeType ? c = b.nodeValue : 1 === b.nodeType && (c = P(b));
  c && c.length && a.push(c);
}

function ta(a, b, c) {
  var d;
  for (c || (c = 0); a && a.previousSibling;) {
    a = a.previousSibling;
    if (R(a)) return;
    ra(b, a);
  }
  if (a && 0 === b.length) {
    for (d = null; !d;) {
      a = a.parentElement || a.parentNode;
      if (!a) return;
      for (d = a.previousSibling; d && !R(d);) d = d.previousSibling;
      if (d) {
        a = d;
        break;
      }
    }
    a && ta(a, b, c + 1);
  }
}

function S(a) {
  for (var b = a, c = (a = a.ownerDocument) ? a.defaultView : {}, d;
    (b && b !== a);) {
    d = c.getComputedStyle && b instanceof Element ? c.getComputedStyle(b, null) : b.style;
    if (!d) return !0;
    if ('none' === d.display || 'hidden' === d.visibility || '0' === d.opacity || '0' === d.width || '0' === d.height) return !0;
    b = b.parentElement || b.parentNode;
  }
  return !1;
}

function ua(a) {
  var b = a.ownerDocument.documentElement,
    c = a.getBoundingClientRect(),
    d = b.scrollWidth,
    e = b.scrollHeight,
    f = c.left - b.clientLeft,
    b = c.top - b.clientTop,
    g;
  if (!S(a) || !a.offsetParent || 10 > a.clientWidth && 10 > a.clientHeight || 10 > c.width && 10 > c.height) return !1;
  g = window.innerWidth;
  var k = window.innerHeight;
  return 0 >= f || c.left >= d || 0 >= b || c.top >= e ? !1 : (d = c.left <= g / 2 ? c.left : g - c.right, g = c.top <= k / 2 ? c.top : k - c.bottom, d <= c.width / 2 && g <= c.height / 2) ? !0 : !1;
}

function xa(a) {
  var b;
  if (!a) return !1;
  a: {
    var c;
    if (a && !(2 < a.length)) {
      for (c = 0; c < a.length; c++) if (b = a.elements[c], b.type && 'search' == b.type.toLowerCase()) {
        b = !0;
        break a;
      }
    }
    b = !1;
  }
  if (b) return !0;
  b = /(login|signin|sign in|sign up|signup|register|log in|log on|logon|log out|logout|log off|logoff|sign out|signout|sign off|signoff|change password|password reset|reset password|password change|reset login)/i;
  return b.test(a.id) || b.test(a.name) || b.test(a.className) || b.test(a.action) ? !0 : !1;
}

function ya(a) {
  var b = Array.prototype.slice.call(a.getElementsByTagName('input'));
  a = 0 < b.filter(function(a) {
    return 'text' === a.type.toLowerCase() && FieldCollector.c(a);
  }).length;
  b = 0 < b.filter(function(a) {
    return 'password' === a.type.toLowerCase() && FieldCollector.c(a);
  }).length;
  return a && b && (2 == a.length || 3 == a.length && d) ? !0 : !1;
}

function za(a) {
  if (0 < a.getElementsByTagName('textarea').length + a.getElementsByTagName('button').length + a.getElementsByTagName('select').length) return !1;
  a = Array.prototype.slice.call(a.getElementsByTagName('input')).filter(function(a) {
    return 'text' === a.type.toLowerCase() || 'password' === a.type.toLowerCase();
  }).length;
  return b && c && (2 == a.length || 3 == a.length && d) ? !0 : !1;
}

function T(a) {
  return a ? a.getAttribute('id') + '/' + a.getAttribute('name') + '/' + a.getAttribute('action') : '<null>';
}

function Aa(a) {
  if (!a || 'form' === a.tagName.toLowerCase()) return a;
  if (a.form) return a.form;
  var b, c, d = a.ownerDocument.forms;
  c = a.closest('form');
  if (null === c) {
    var e, f;
    a: for (b = 0; b < d.length; b++) if (ya(d[b])) {
      e = d[b];
      break a;
    }
    null !== e && (c = e);
  }
  return c;
}

function G(a) {
  var b = null;
  if (void 0 === a || null === a) return null;
  try {
    if (FieldCollector && FieldCollector.hasOwnProperty('elementForOPID') && (b = FieldCollector.elementForOPID(a)), null === b) {
      var c = Ba(document, 'input[id="' + a + '"]');
      c && (b = c);
    }
  } catch (d) {}
  return b;
}

function q(a, b) {
  return a && a.getAttribute ? a.getAttribute(b) : null;
}

function c(a) {
  if (!a) return null;
  var b = {};
  e(b, 'htmlName', q(a, 'name'));
  e(b, 'htmlID', q(a, 'id'));
  e(b, 'htmlAction', D.h.K(q(a, 'action')));
 
