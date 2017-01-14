"use strict";

// =============================================================================
// Tools
// =============================================================================

var tools = {};

tools.debounce = function (func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
		    args = arguments;
		var later = function later() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

tools.throttle = function (func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function later() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function () {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
"use strict";

// =============================================================================
// Blog header behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Blog = function Blog(config) {

		var blog = {
			props: Object.assign({
				target: ".blog",
				title: ".blog__title",
				leadin: ".blog__leadin",
				author: ".blog__author",
				twitterTrigger: "twitterTrigger",
				facebookTrigger: "facebookTrigger"
			}, config),
			state: {
				element: null,
				twitterTrigger: null,
				facebookTrigger: null,
				title: "",
				leadin: "",
				author: ""
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					this.state.title = this.state.element.querySelector(this.props.title).textContent;
					this.state.leadin = this.state.element.querySelector(this.props.leadin).textContent;
					this.state.author = this.state.element.querySelector(this.props.author).textContent;
					this.state.element.addEventListener('click', function (e) {
						e.preventDefault;
						e.stopPropagation;
						_this.handleClick(e.target);
					});
				} else {
					return false;
				}
			},
			handleClick: function handleClick(node) {
				if (node.classList.contains(this.props.twitterTrigger)) {
					this.postTwitter();
				} else if (node.classList.contains(this.props.facebookTrigger)) {
					this.postFacebook();
				} else {
					return false;
				}
			},
			postTwitter: function postTwitter() {
				var intent = "https://twitter.com/intent/tweet?text=";
				var link = window.location.href;
				window.open(intent + '"' + encodeURI(this.state.title) + '"' + " on " + link);
			},
			postFacebook: function postFacebook() {
				var appId = "https://www.facebook.com/dialog/feed?app_id=279503749068654"; // Update to your app_id
				var redirectUri = "redirect_uri=http://universe.mrozilla.cz/close.php";
				var link = "link=" + window.location.href;
				var description = "description=" + encodeURI(this.props.title);
				window.open(appId + "&" + redirectUri + "&" + link + "&" + description);
			}
		};

		return blog;
	};

	window.Blog = Blog;
})(window);
"use strict";

// =============================================================================
// Blog Image behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Click = function Click(config) {

		var hoverExpand = {
			props: Object.assign({
				target: ".blog .image",
				activeClass: "is--expanded"
			}, config),
			state: {
				elements: []
			},
			init: function init() {
				var _this = this;

				if (this.state.elements = document.querySelectorAll(this.props.target)) {
					var i = this.state.elements.length;while (i--) {
						this.state.elements[i].addEventListener('click', function (e) {
							_this.handleClick(e.target);
						});
					}
				} else {
					return;
				}
			},
			handleClick: function handleClick(el) {
				el.classList.toggle(this.props.activeClass);
			}
		};

		return hoverExpand;
	};

	window.Click = Click;
})(window);
"use strict";

// =============================================================================
// Form behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Form = function Form(config) {

		var form = {
			props: Object.assign({
				target: ".form",
				fileSizeLimitMB: 2,
				errorClass: "is--error"
			}, config),
			state: {
				element: null,
				fields: null
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					this.state.fields = this.state.element.querySelectorAll('input');
					this.onLoad();
					var i = this.state.fields.length;while (i--) {
						if (this.state.fields[i].type !== 'file' && this.state.fields[i].type !== 'submit') {
							this.state.fields[i].addEventListener('blur', function (e) {
								_this.onBlur(e.target);
							});
						} else if (this.state.fields[i].type === 'file') {
							this.state.fields[i].addEventListener('change', function (e) {
								_this.checkFileSize(e.target);
							});
						} else if (this.state.fields[i].type === 'submit') {
							this.state.fields[i].addEventListener('click', function (e) {
								_this.onSubmit(e);
							});
						}
					}
				} else {
					return false;
				}
			},
			onLoad: function onLoad() {
				var i = this.state.fields.length;while (i--) {
					if (localStorage.getItem(this.state.fields[i].name) !== null && this.state.fields[i].type !== 'file') {
						this.state.fields[i].value = localStorage.getItem(this.state.fields[i].name);
					}
				}
			},
			onBlur: function onBlur(node) {
				localStorage.setItem(node.name, node.value);
			},
			checkFileSize: function checkFileSize(node) {
				node.classList.remove(this.props.errorClass);
				var filesize = (node.files[0].size / 1024 / 1024).toFixed(4);
				if (filesize > this.props.fileSizeLimitMB) {
					node.classList.add(this.props.errorClass);
					node.value = "";
				}
			},
			onSubmit: function onSubmit(event) {
				localStorage.clear();
			}
		};

		return form;
	};

	window.Form = Form;
})(window);
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! highlight.js v9.6.0 | BSD3 License | git.io/hljslicense */
!function (e) {
  var n = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self;"undefined" != typeof exports ? e(exports) : n && (n.hljs = e({}), "function" == typeof define && define.amd && define([], function () {
    return n.hljs;
  }));
}(function (e) {
  function n(e) {
    return e.replace(/[&<>]/gm, function (e) {
      return I[e];
    });
  }function t(e) {
    return e.nodeName.toLowerCase();
  }function r(e, n) {
    var t = e && e.exec(n);return t && 0 === t.index;
  }function a(e) {
    return k.test(e);
  }function i(e) {
    var n,
        t,
        r,
        i,
        o = e.className + " ";if (o += e.parentNode ? e.parentNode.className : "", t = B.exec(o)) return R(t[1]) ? t[1] : "no-highlight";for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++) {
      if (i = o[n], a(i) || R(i)) return i;
    }
  }function o(e, n) {
    var t,
        r = {};for (t in e) {
      r[t] = e[t];
    }if (n) for (t in n) {
      r[t] = n[t];
    }return r;
  }function u(e) {
    var n = [];return function r(e, a) {
      for (var i = e.firstChild; i; i = i.nextSibling) {
        3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({ event: "start", offset: a, node: i }), a = r(i, a), t(i).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: i }));
      }return a;
    }(e, 0), n;
  }function c(e, r, a) {
    function i() {
      return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r;
    }function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }l += "<" + t(e) + w.map.call(e.attributes, r).join("") + ">";
    }function u(e) {
      l += "</" + t(e) + ">";
    }function c(e) {
      ("start" === e.event ? o : u)(e.node);
    }for (var s = 0, l = "", f = []; e.length || r.length;) {
      var g = i();if (l += n(a.substr(s, g[0].offset - s)), s = g[0].offset, g === e) {
        f.reverse().forEach(u);do {
          c(g.splice(0, 1)[0]), g = i();
        } while (g === e && g.length && g[0].offset === s);f.reverse().forEach(o);
      } else "start" === g[0].event ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0]);
    }return l + n(a.substr(s));
  }function s(e) {
    function n(e) {
      return e && e.source || e;
    }function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }function r(a, i) {
      if (!a.compiled) {
        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
          var u = {},
              c = function c(n, t) {
            e.cI && (t = t.toLowerCase()), t.split(" ").forEach(function (e) {
              var t = e.split("|");u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
            });
          };"string" == typeof a.k ? c("keyword", a.k) : E(a.k).forEach(function (e) {
            c(e, a.k[e]);
          }), a.k = u;
        }a.lR = t(a.l || /\w+/, !0), i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), a.bR = t(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), a.tE = n(a.e) || "", a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)), a.i && (a.iR = t(a.i)), null == a.r && (a.r = 1), a.c || (a.c = []);var s = [];a.c.forEach(function (e) {
          e.v ? e.v.forEach(function (n) {
            s.push(o(e, n));
          }) : s.push("self" === e ? a : e);
        }), a.c = s, a.c.forEach(function (e) {
          r(e, a);
        }), a.starts && r(a.starts, i);var l = a.c.map(function (e) {
          return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
        }).concat([a.tE, a.i]).map(n).filter(Boolean);a.t = l.length ? t(l.join("|"), !0) : { exec: function exec() {
            return null;
          } };
      }
    }r(e);
  }function l(e, t, a, i) {
    function o(e, n) {
      var t, a;for (t = 0, a = n.c.length; a > t; t++) {
        if (r(n.c[t].bR, e)) return n.c[t];
      }
    }function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent;) {
          e = e.parent;
        }return e;
      }return e.eW ? u(e.parent, n) : void 0;
    }function c(e, n) {
      return !a && r(n.iR, e);
    }function g(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];return e.k.hasOwnProperty(t) && e.k[t];
    }function h(e, n, t, r) {
      var a = r ? "" : y.classPrefix,
          i = '<span class="' + a,
          o = t ? "" : C;return i += e + '">', i + n + o;
    }function p() {
      var e, t, r, a;if (!E.k) return n(B);for (a = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(B); r;) {
        a += n(B.substr(t, r.index - t)), e = g(E, r), e ? (M += e[1], a += h(e[0], n(r[0]))) : a += n(r[0]), t = E.lR.lastIndex, r = E.lR.exec(B);
      }return a + n(B.substr(t));
    }function d() {
      var e = "string" == typeof E.sL;if (e && !x[E.sL]) return n(B);var t = e ? l(E.sL, B, !0, L[E.sL]) : f(B, E.sL.length ? E.sL : void 0);return E.r > 0 && (M += t.r), e && (L[E.sL] = t.top), h(t.language, t.value, !1, !0);
    }function b() {
      k += null != E.sL ? d() : p(), B = "";
    }function v(e) {
      k += e.cN ? h(e.cN, "", !0) : "", E = Object.create(e, { parent: { value: E } });
    }function m(e, n) {
      if (B += e, null == n) return b(), 0;var t = o(n, E);if (t) return t.skip ? B += n : (t.eB && (B += n), b(), t.rB || t.eB || (B = n)), v(t, n), t.rB ? 0 : n.length;var r = u(E, n);if (r) {
        var a = E;a.skip ? B += n : (a.rE || a.eE || (B += n), b(), a.eE && (B = n));do {
          E.cN && (k += C), E.skip || (M += E.r), E = E.parent;
        } while (E !== r.parent);return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
      }if (c(n, E)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"');return B += n, n.length || 1;
    }var N = R(e);if (!N) throw new Error('Unknown language: "' + e + '"');s(N);var w,
        E = i || N,
        L = {},
        k = "";for (w = E; w !== N; w = w.parent) {
      w.cN && (k = h(w.cN, "", !0) + k);
    }var B = "",
        M = 0;try {
      for (var I, j, O = 0;;) {
        if (E.t.lastIndex = O, I = E.t.exec(t), !I) break;j = m(t.substr(O, I.index - O), I[0]), O = I.index + j;
      }for (m(t.substr(O)), w = E; w.parent; w = w.parent) {
        w.cN && (k += C);
      }return { r: M, value: k, language: e, top: E };
    } catch (T) {
      if (T.message && -1 !== T.message.indexOf("Illegal")) return { r: 0, value: n(t) };throw T;
    }
  }function f(e, t) {
    t = t || y.languages || E(x);var r = { r: 0, value: n(e) },
        a = r;return t.filter(R).forEach(function (n) {
      var t = l(n, e, !1);t.language = n, t.r > a.r && (a = t), t.r > r.r && (a = r, r = t);
    }), a.language && (r.second_best = a), r;
  }function g(e) {
    return y.tabReplace || y.useBR ? e.replace(M, function (e, n) {
      return y.useBR && "\n" === e ? "<br>" : y.tabReplace ? n.replace(/\t/g, y.tabReplace) : void 0;
    }) : e;
  }function h(e, n, t) {
    var r = n ? L[n] : t,
        a = [e.trim()];return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
  }function p(e) {
    var n,
        t,
        r,
        o,
        s,
        p = i(e);a(p) || (y.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, s = n.textContent, r = p ? l(p, s, !0) : f(s), t = u(n), t.length && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), o.innerHTML = r.value, r.value = c(t, u(o), s)), r.value = g(r.value), e.innerHTML = r.value, e.className = h(e.className, p, r.language), e.result = { language: r.language, re: r.r }, r.second_best && (e.second_best = { language: r.second_best.language, re: r.second_best.r }));
  }function d(e) {
    y = o(y, e);
  }function b() {
    if (!b.called) {
      b.called = !0;var e = document.querySelectorAll("pre code");w.forEach.call(e, p);
    }
  }function v() {
    addEventListener("DOMContentLoaded", b, !1), addEventListener("load", b, !1);
  }function m(n, t) {
    var r = x[n] = t(e);r.aliases && r.aliases.forEach(function (e) {
      L[e] = n;
    });
  }function N() {
    return E(x);
  }function R(e) {
    return e = (e || "").toLowerCase(), x[e] || x[L[e]];
  }var w = [],
      E = Object.keys,
      x = {},
      L = {},
      k = /^(no-?highlight|plain|text)$/i,
      B = /\blang(?:uage)?-([\w-]+)\b/i,
      M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
      C = "</span>",
      y = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 },
      I = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };return e.highlight = l, e.highlightAuto = f, e.fixMarkup = g, e.highlightBlock = p, e.configure = d, e.initHighlighting = b, e.initHighlightingOnLoad = v, e.registerLanguage = m, e.listLanguages = N, e.getLanguage = R, e.inherit = o, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = { b: "\\\\[\\s\\S]", r: 0 }, e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }, e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }, e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/ }, e.C = function (n, t, r) {
    var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a;
  }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = { cN: "number", b: e.NR, r: 0 }, e.CNM = { cN: "number", b: e.CNR, r: 0 }, e.BNM = { cN: "number", b: e.BNR, r: 0 }, e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }, e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }, e.TM = { cN: "title", b: e.IR, r: 0 }, e.UTM = { cN: "title", b: e.UIR, r: 0 }, e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }, e;
});hljs.registerLanguage("javascript", function (e) {
  return { aliases: ["js", "jsx"], k: { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" }, c: [{ cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ }, { cN: "meta", b: /^#!/, e: /$/ }, e.ASM, e.QSM, { cN: "string", b: "`", e: "`", c: [e.BE, { cN: "subst", b: "\\$\\{", e: "\\}" }] }, e.CLCM, e.CBCM, { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 }, { b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*", k: "return throw case", c: [e.CLCM, e.CBCM, e.RM, { b: /</, e: /(\/\w+|\w+\/)>/, sL: "xml", c: [{ b: /<\w+\s*\/>/, skip: !0 }, { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: ["self"] }] }], r: 0 }, { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: /[A-Za-z$_][0-9A-Za-z$_]*/ }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: [e.CLCM, e.CBCM] }], i: /\[|%/ }, { b: /\$[(.]/ }, e.METHOD_GUARD, { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] }, { bK: "constructor", e: /\{/, eE: !0 }], i: /#(?!!)/ };
});hljs.registerLanguage("php", function (e) {
  var c = { b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*" },
      i = { cN: "meta", b: /<\?(php)?|\?>/ },
      t = { cN: "string", c: [e.BE, i], v: [{ b: 'b"', e: '"' }, { b: "b'", e: "'" }, e.inherit(e.ASM, { i: null }), e.inherit(e.QSM, { i: null })] },
      a = { v: [e.BNM, e.CNM] };return { aliases: ["php3", "php4", "php5", "php6"], cI: !0, k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally", c: [e.HCM, e.C("//", "$", { c: [i] }), e.C("/\\*", "\\*/", { c: [{ cN: "doctag", b: "@[A-Za-z]+" }] }), e.C("__halt_compiler.+?;", !1, { eW: !0, k: "__halt_compiler", l: e.UIR }), { cN: "string", b: /<<<['"]?\w+['"]?$/, e: /^\w+;?$/, c: [e.BE, { cN: "subst", v: [{ b: /\$\w+/ }, { b: /\{\$/, e: /\}/ }] }] }, i, { cN: "keyword", b: /\$this\b/ }, c, { b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/ }, { cN: "function", bK: "function", e: /[;{]/, eE: !0, i: "\\$|\\[|%", c: [e.UTM, { cN: "params", b: "\\(", e: "\\)", c: ["self", c, e.CBCM, t, a] }] }, { cN: "class", bK: "class interface", e: "{", eE: !0, i: /[:\(\$"]/, c: [{ bK: "extends implements" }, e.UTM] }, { bK: "namespace", e: ";", i: /[\.']/, c: [e.UTM] }, { bK: "use", e: ";", c: [e.UTM] }, { b: "=>" }, t, a] };
});hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
      t = { b: /[A-Z\_\.\-]+\s*:/, rB: !0, e: ";", eW: !0, c: [{ cN: "attribute", b: /\S/, e: ":", eE: !0, starts: { eW: !0, eE: !0, c: [{ b: /[\w-]+\(/, rB: !0, c: [{ cN: "built_in", b: /[\w-]+/ }, { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] }] }, e.CSSNM, e.QSM, e.ASM, e.CBCM, { cN: "number", b: "#[0-9A-Fa-f]+" }, { cN: "meta", b: "!important" }] } }] };return { cI: !0, i: /[=\/|'\$]/, c: [e.CBCM, { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ }, { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ }, { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" }, { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ }, { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" }, { b: "@", e: "[{;]", i: /:/, c: [{ cN: "keyword", b: /\w+/ }, { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] }] }, { cN: "selector-tag", b: c, r: 0 }, { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] }] };
});hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
      t = { eW: !0, i: /</, r: 0, c: [{ cN: "attr", b: e, r: 0 }, { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] }] };return { aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"], cI: !0, c: [{ cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] }, s.C("<!--", "-->", { r: 10 }), { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 }, { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] }, { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } }, { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } }, { cN: "meta", v: [{ b: /<\?xml/, e: /\?>/, r: 10 }, { b: /<\?\w+/, e: /\?>/ }] }, { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] }] };
});hljs.registerLanguage("bash", function (e) {
  var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
      s = { cN: "string", b: /"/, e: /"/, c: [e.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] }] },
      a = { cN: "string", b: /'/, e: /'/ };return { aliases: ["sh", "zsh"], l: /-?[a-z\._]+/, k: { keyword: "if then else elif fi for while in do done case esac function", literal: "true false", built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp", _: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "meta", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })], r: 0 }, e.HCM, s, a, t] };
});
'use strict';

// =============================================================================
// Image background fetch
// =============================================================================

;(function (document) {

	'use strict';

	var imageDivs = document.querySelectorAll('[data-image-background]');

	if (imageDivs) {
		var i = imageDivs.length;while (i--) {
			var imageSource = imageDivs[i].dataset.imageBackground;
			imageDivs[i].style.backgroundImage = "url('" + imageSource + "')";
		}
	}
})(document);
"use strict";

// =============================================================================
// Navbar
// =============================================================================

;(function (window) {

	'use strict';

	var Navbar = function Navbar(config) {

		var navbar = {
			props: Object.assign({
				target: ".navbar",
				toggle: ".navbar__toggle",
				hidingClass: "is--hidden",
				openClass: "is--open",
				highlightClass: "burger--highlight",
				delta: 50
			}, config),
			state: {
				element: null,
				toggle: null,
				bottom: null,
				scrollTop: null,
				lastScrollTop: 0
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					if (this.state.element.classList.contains('navbar--hiding')) {
						this.state.bottom = document.body.clientHeight - window.innerHeight;
						document.addEventListener('scroll', tools.throttle(function (e) {
							_this.handleScroll();
						}, 250));
					}
					if (this.state.toggle = this.state.element.querySelector(this.props.toggle)) {
						this.state.toggle.addEventListener('click', function (e) {
							_this.handleClick();
						});
					}
				} else {
					return;
				}
			},
			handleScroll: function handleScroll() {
				this.state.scrollTop = window.pageYOffset | document.body.scrollTop;
				if (Math.abs(this.state.lastScrollTop - this.state.scrollTop) <= this.props.delta) {
					return;
				} else {
					if (this.state.scrollTop > this.state.bottom - this.props.delta || this.state.scrollTop <= 0 || this.state.scrollTop < this.state.lastScrollTop) {
						this.showNavbar();
					} else if (this.state.scrollTop > this.state.lastScrollTop) {
						this.hideNavbar();
					}
				}
				this.state.lastScrollTop = this.state.scrollTop;
			},
			hideNavbar: function hideNavbar() {
				this.state.element.classList.add(this.props.hidingClass);
			},
			showNavbar: function showNavbar() {
				this.state.element.classList.remove(this.props.hidingClass);
			},
			handleClick: function handleClick() {
				this.state.toggle.classList.toggle(this.props.highlightClass);
				this.state.element.classList.toggle(this.props.openClass);
			}
		};

		return navbar;
	};

	window.Navbar = Navbar;
})(window);
'use strict';

// =============================================================================
// Object-fit polyfill
// =============================================================================

;(function (document) {

	'use strict';

	if ('objectFit' in document.documentElement.style === false) {
		var imgTags = document.getElementsByClassName('image__src');

		var i = imgTags.length;while (i--) {
			var imageSource = imgTags[i].querySelector('img').src;
			imgTags[i].querySelector('img').style.display = 'none';
			imgTags[i].parent().style.backgroundSize = 'cover';
			imgTags[i].parent().style.backgroundImage = 'url(' + imageSource + ')';
			imgTags[i].parent().style.backgroundPosition = 'center center';
		}
	}
})(document);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/////    /////    /////    /////
/////    /////    /////    /////
/////    /////    /////    /////
/////    /////    /////    /////
/////             /////    /////
/////             /////    /////
/////    /////    /////    /////
/////    /////    /////    /////
/////    /////
/////    /////
/////    /////    /////    /////
/////    /////    /////    /////
/////    /////    /////    /////
/////    /////    /////    /////

/**
 * ScrollReveal
 * ------------
 * Version : 3.2.0
 * Website : scrollrevealjs.org
 * Repo    : github.com/jlmakes/scrollreveal.js
 * Author  : Julian Lloyd (@jlmakes)
 */

;(function () {
  'use strict';

  var sr;
  var _requestAnimationFrame;

  function ScrollReveal(config) {
    // Support instantiation without the `new` keyword.
    if (typeof this === 'undefined' || Object.getPrototypeOf(this) !== ScrollReveal.prototype) {
      return new ScrollReveal(config);
    }

    sr = this; // Save reference to instance.
    sr.version = '3.2.0';
    sr.tools = new Tools(); // *required utilities

    if (sr.isSupported()) {
      sr.tools.extend(sr.defaults, config || {});

      _resolveContainer(sr.defaults);

      sr.store = {
        elements: {},
        containers: []
      };

      sr.sequences = {};
      sr.history = [];
      sr.uid = 0;
      sr.initialized = false;
    } else if (typeof console !== 'undefined' && console !== null) {
      // Note: IE9 only supports console if devtools are open.
      console.log('ScrollReveal is not supported in this browser.');
    }

    return sr;
  }

  /**
   * Configuration
   * -------------
   * This object signature can be passed directly to the ScrollReveal constructor,
   * or as the second argument of the `reveal()` method.
   */

  ScrollReveal.prototype.defaults = {
    // CSS class to be given/removed from the element
    klass: "is--revealed",

    // `<html>` is the default reveal container. You can pass either:
    // DOM Node, e.g. document.querySelector('.fooContainer')
    // Selector, e.g. '.fooContainer'
    container: window.document.documentElement,

    // true/false to control reveal animations on mobile.
    mobile: true,

    // true:  reveals occur every time elements become visible
    // false: reveals occur once as elements become visible
    reset: false,

    // Change when an element is considered in the viewport. The default value
    // of 0.20 means 20% of an element must be visible for its reveal to occur.
    viewFactor: 0.2,

    // Pixel values that alter the container boundaries.
    // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
    // --
    // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },

    // Callbacks that fire for each completed element reveal, and if
    // `config.reset = true`, for each completed element reset. When creating your
    // callbacks, remember they are passed the element’s DOM node that triggered
    // it as the first argument.
    afterReveal: function afterReveal(domEl) {},
    afterReset: function afterReset(domEl) {}
  };

  /**
   * Check if client supports CSS Transform and CSS Transition.
   * @return {boolean}
   */
  ScrollReveal.prototype.isSupported = function () {
    var style = document.documentElement.style;
    return 'WebkitTransition' in style && 'WebkitTransform' in style || 'transition' in style && 'transform' in style;
  };

  /**
   * Creates a reveal set, a group of elements that will animate when they
   * become visible. If [interval] is provided, a new sequence is created
   * that will ensure elements reveal in the order they appear in the DOM.
   *
   * @param {Node|NodeList|string} [target]   The node, node list or selector to use for animation.
   * @param {Object}               [config]   Override the defaults for this reveal set.
   * @param {number}               [interval] Time between sequenced element animations (milliseconds).
   * @param {boolean}              [sync]     Used internally when updating reveals for async content.
   *
   * @return {Object} The current ScrollReveal instance.
   */
  ScrollReveal.prototype.reveal = function (target, config, interval, sync) {
    var container;
    var elements;
    var elem;
    var elemId;
    var sequence;
    var sequenceId;

    // // No custom configuration was passed, but a sequence interval instead.
    // // let’s shuffle things around to make sure everything works.
    // if (config !== undefined && typeof config === 'number') {
    //   interval = config
    //   config = {}
    // } else 
    if (config === undefined || config === null) {
      config = {};
    }

    container = _resolveContainer(config);
    elements = _getRevealElements(target, container);

    if (!elements.length) {
      console.log('ScrollReveal: reveal on "' + target + '" failed, no elements found.');
      return sr;
    }

    // // Prepare a new sequence if an interval is passed.
    // if (interval && typeof interval === 'number') {
    //   sequenceId = _nextUid()

    //   sequence = sr.sequences[sequenceId] = {
    //     id: sequenceId,
    //     interval: interval,
    //     elemIds: [],
    //     active: false
    //   }
    // }

    // Begin main loop to configure ScrollReveal elements.
    for (var i = 0; i < elements.length; i++) {
      // Check if the element has already been configured and grab it from the store.
      elemId = elements[i].getAttribute('data-sr-id');
      if (elemId) {
        elem = sr.store.elements[elemId];
      } else {
        // Otherwise, let’s do some basic setup.
        elem = {
          id: _nextUid(),
          domEl: elements[i],
          seen: false,
          revealing: false
        };
        elem.domEl.setAttribute('data-sr-id', elem.id);
      }

      // // Sequence only setup
      // if (sequence) {
      //   elem.sequence = {
      //     id: sequence.id,
      //     index: sequence.elemIds.length
      //   }

      //   sequence.elemIds.push(elem.id)
      // }

      // New or existing element, it’s time to update its configuration, styles,
      // and send the updates to our store.
      _configure(elem, config, container);
      // _style(elem)
      _updateStore(elem);

      // // We need to make sure elements are set to visibility: visible, even when
      // // on mobile and `config.mobile === false`, or if unsupported.
      // if (sr.tools.isMobile() && !elem.config.mobile || !sr.isSupported()) {
      //   elem.domEl.setAttribute('style', elem.styles.inline)
      //   elem.disabled = true
      // } else if (!elem.revealing) {
      //   // Otherwise, proceed normally.
      //   // elem.domEl.setAttribute('style',
      //   //   elem.styles.inline +
      //   //   elem.styles.transform.initial
      //   // )
      // }
    }

    // Each `reveal()` is recorded so that when calling `sync()` while working
    // with asynchronously loaded content, it can re-trace your steps but with
    // all your new elements now in the DOM.

    // Since `reveal()` is called internally by `sync()`, we don’t want to
    // record or intitalize each reveal during syncing.
    if (!sync && sr.isSupported()) {
      _record(target, config, interval);

      // We push initialization to the event queue using setTimeout, so that we can
      // give ScrollReveal room to process all reveal calls before putting things into motion.
      // --
      // Philip Roberts - What the heck is the event loop anyway? (JSConf EU 2014)
      // https://www.youtube.com/watch?v=8aGhZQkoFbQ
      if (sr.initTimeout) {
        window.clearTimeout(sr.initTimeout);
      }
      sr.initTimeout = window.setTimeout(_init, 0);
    }

    return sr;
  };

  /**
   * Re-runs `reveal()` for each record stored in history, effectively capturing
   * any content loaded asynchronously that matches existing reveal set targets.
   * @return {Object} The current ScrollReveal instance.
   */
  ScrollReveal.prototype.sync = function () {
    if (sr.history.length && sr.isSupported()) {
      for (var i = 0; i < sr.history.length; i++) {
        var record = sr.history[i];
        sr.reveal(record.target, record.config, record.interval, true);
      }
      _init();
    } else {
      console.log('ScrollReveal: sync failed, no reveals found.');
    }
    return sr;
  };

  /**
   * Private Methods
   * ---------------
   */

  function _resolveContainer(config) {
    if (config && config.container) {
      if (typeof config.container === 'string') {
        return window.document.documentElement.querySelector(config.container);
      } else if (sr.tools.isNode(config.container)) {
        return config.container;
      } else {
        console.log('ScrollReveal: invalid container "' + config.container + '" provided.');
        console.log('ScrollReveal: falling back to default container.');
      }
    }
    return sr.defaults.container;
  }

  /**
   * check to see if a node or node list was passed in as the target,
   * otherwise query the container using target as a selector.
   *
   * @param {Node|NodeList|string} [target]    client input for reveal target.
   * @param {Node}                 [container] parent element for selector queries.
   *
   * @return {array} elements to be revealed.
   */
  function _getRevealElements(target, container) {
    if (typeof target === 'string') {
      return Array.prototype.slice.call(container.querySelectorAll(target));
    } else if (sr.tools.isNode(target)) {
      return [target];
    } else if (sr.tools.isNodeList(target)) {
      return Array.prototype.slice.call(target);
    }
    return [];
  }

  /**
   * A consistent way of creating unique IDs.
   * @returns {number}
   */
  function _nextUid() {
    return ++sr.uid;
  }

  function _configure(elem, config, container) {
    // If a container was passed as a part of the config object,
    // let’s overwrite it with the resolved container passed in.
    if (config.container) config.container = container;
    // If the element hasn’t already been configured, let’s use a clone of the
    // defaults extended by the configuration passed as the second argument.
    if (!elem.config) {
      elem.config = sr.tools.extendClone(sr.defaults, config);
    } else {
      // Otherwise, let’s use a clone of the existing element configuration extended
      // by the configuration passed as the second argument.
      elem.config = sr.tools.extendClone(elem.config, config);
    }
  }

  //   // Infer CSS Transform axis from origin string.
  //   if (elem.config.origin === 'top' || elem.config.origin === 'bottom') {
  //     elem.config.axis = 'Y'
  //   } else {
  //     elem.config.axis = 'X'
  //   }
  // }

  // function _style (elem) {
  //   var computed = window.getComputedStyle(elem.domEl)

  //   if (!elem.styles) {
  //     elem.styles = {
  //       transition: {},
  //       transform: {},
  //       computed: {}
  //     }

  //     // Capture any existing inline styles, and add our visibility override.
  //     // --
  //     // See section 4.2. in the Documentation:
  //     // https://github.com/jlmakes/scrollreveal.js#42-improve-user-experience
  //     elem.styles.inline = elem.domEl.getAttribute('style') || ''
  //     elem.styles.inline += '; visibility: visible; '

  //     // grab the elements existing opacity.
  //     elem.styles.computed.opacity = computed.opacity

  //     // grab the elements existing transitions.
  //     if (!computed.transition || computed.transition === 'all 0s ease 0s') {
  //       elem.styles.computed.transition = ''
  //     } else {
  //       elem.styles.computed.transition = computed.transition + ', '
  //     }
  //   }

  //   // Create transition styles
  //   elem.styles.transition.instant = _generateTransition(elem, 0)
  //   elem.styles.transition.delayed = _generateTransition(elem, elem.config.delay)

  //   // Generate transform styles, first with the webkit prefix.
  //   elem.styles.transform.initial = ' -webkit-transform:'
  //   elem.styles.transform.target = ' -webkit-transform:'
  //   _generateTransform(elem)

  //   // And again without any prefix.
  //   elem.styles.transform.initial += 'transform:'
  //   elem.styles.transform.target += 'transform:'
  //   _generateTransform(elem)
  // }

  // function _generateTransition (elem, delay) {
  //   var config = elem.config

  //   return '-webkit-transition: ' + elem.styles.computed.transition +
  //     '-webkit-transform ' + config.duration / 1000 + 's ' +
  //     config.easing + ' ' +
  //     delay / 1000 + 's, opacity ' +
  //     config.duration / 1000 + 's ' +
  //     config.easing + ' ' +
  //     delay / 1000 + 's; ' +

  //     'transition: ' + elem.styles.computed.transition +
  //     'transform ' + config.duration / 1000 + 's ' +
  //     config.easing + ' ' +
  //     delay / 1000 + 's, opacity ' +
  //     config.duration / 1000 + 's ' +
  //     config.easing + ' ' +
  //     delay / 1000 + 's; '
  // }

  // function _generateTransform (elem) {
  //   var config = elem.config
  //   var cssDistance
  //   var transform = elem.styles.transform

  //   // Let’s make sure our our pixel distances are negative for top and left.
  //   // e.g. origin = 'top' and distance = '25px' starts at `top: -25px` in CSS.
  //   if (config.origin === 'top' || config.origin === 'left') {
  //     cssDistance = /^-/.test(config.distance)
  //       ? config.distance.substr(1)
  //       : '-' + config.distance
  //   } else {
  //     cssDistance = config.distance
  //   }

  //   if (parseInt(config.distance)) {
  //     transform.initial += ' translate' + config.axis + '(' + cssDistance + ')'
  //     transform.target += ' translate' + config.axis + '(0)'
  //   }
  //   if (config.scale) {
  //     transform.initial += ' scale(' + config.scale + ')'
  //     transform.target += ' scale(1)'
  //   }
  //   if (config.rotate.x) {
  //     transform.initial += ' rotateX(' + config.rotate.x + 'deg)'
  //     transform.target += ' rotateX(0)'
  //   }
  //   if (config.rotate.y) {
  //     transform.initial += ' rotateY(' + config.rotate.y + 'deg)'
  //     transform.target += ' rotateY(0)'
  //   }
  //   if (config.rotate.z) {
  //     transform.initial += ' rotateZ(' + config.rotate.z + 'deg)'
  //     transform.target += ' rotateZ(0)'
  //   }
  //   transform.initial += '; opacity: ' + config.opacity + ';'
  //   transform.target += '; opacity: ' + elem.styles.computed.opacity + ';'
  // }

  function _updateStore(elem) {
    var container = elem.config.container;

    // If this element’s container isn’t already in the store, let’s add it.
    if (container && sr.store.containers.indexOf(container) === -1) {
      sr.store.containers.push(elem.config.container);
    }

    // Update the element stored with our new element.
    sr.store.elements[elem.id] = elem;
  }

  function _record(target, config, interval) {
    // Save the `reveal()` arguments that triggered this `_record()` call, so we
    // can re-trace our steps when calling the `sync()` method.
    var record = {
      target: target,
      config: config,
      interval: interval
    };
    sr.history.push(record);
  }

  function _init() {
    if (sr.isSupported()) {
      // Initial animate call triggers valid reveal animations on first load.
      // Subsequent animate calls are made inside the event handler.
      _animate();

      // Then we loop through all container nodes in the store and bind event
      // listeners to each.
      for (var i = 0; i < sr.store.containers.length; i++) {
        sr.store.containers[i].addEventListener('scroll', _handler);
        sr.store.containers[i].addEventListener('resize', _handler);
      }

      // Let’s also do a one-time binding of window event listeners.
      if (!sr.initialized) {
        window.addEventListener('scroll', _handler);
        window.addEventListener('resize', _handler);
        sr.initialized = true;
      }
    }
    return sr;
  }

  function _handler() {
    _requestAnimationFrame(_animate);
  }

  // function _setActiveSequences () {
  //   var active
  //   var elem
  //   var elemId
  //   var sequence

  //   // Loop through all sequences
  //   sr.tools.forOwn(sr.sequences, function (sequenceId) {
  //     sequence = sr.sequences[sequenceId]
  //     active = false

  //     // For each sequenced elemenet, let’s check visibility and if
  //     // any are visible, set it’s sequence to active.
  //     for (var i = 0; i < sequence.elemIds.length; i++) {
  //       elemId = sequence.elemIds[i]
  //       elem = sr.store.elements[elemId]
  //       if (_isElemVisible(elem) && !active) {
  //         active = true
  //       }
  //     }

  //     sequence.active = active
  //   })
  // }

  function _animate() {
    // var delayed
    var elem;

    // _setActiveSequences()

    // Loop through all elements in the store
    sr.tools.forOwn(sr.store.elements, function (elemId) {
      elem = sr.store.elements[elemId];
      // delayed = _shouldUseDelay(elem)

      // Let’s see if we should reveal, and if so, whether to use delay.
      if (_shouldReveal(elem)) {
        elem.domEl.classList.add(elem.config.klass); // TODO watch out, hacky
        // if (delayed) {
        //   elem.domEl.setAttribute('style',
        //     elem.styles.inline +
        //     elem.styles.transform.target +
        //     elem.styles.transition.delayed
        //   )
        // } else {
        //   elem.domEl.setAttribute('style',
        //     elem.styles.inline +
        //     elem.styles.transform.target +
        //     elem.styles.transition.instant
        //   )
        // }

        // Let’s queue the `afterReveal` callback and tag the element.
        // _queueCallback('reveal', elem, delayed)
        elem.revealing = true;
        elem.seen = true;

        // if (elem.sequence) {
        //   _queueNextInSequence(elem, delayed)
        // }
      } else if (_shouldReset(elem)) {
        // If we got this far our element shouldn’t reveal, but should it reset?
        // elem.domEl.setAttribute('style',
        //   elem.styles.inline +
        //   elem.styles.transform.initial +
        //   elem.styles.transition.instant
        // )
        elem.domEl.classList.remove(elem.config.klass); // TODO figure out the dynamic class name
        // _queueCallback('reset', elem)
        elem.revealing = false;
      }
    });
  }

  // function _queueNextInSequence (elem, delayed) {
  //   var elapsed = 0
  //   var delay = 0
  //   var sequence = sr.sequences[elem.sequence.id]

  //   // We’re processing a sequenced element, so let's block other elements in this sequence.
  //   sequence.blocked = true

  //   // Since we’re triggering animations a part of a sequence after animations on first load,
  //   // we need to check for that condition and explicitly add the delay to our timer.
  //   if (delayed && elem.config.useDelay === 'onload') {
  //     delay = elem.config.delay
  //   }

  //   // If a sequence timer is already running, capture the elapsed time and clear it.
  //   if (elem.sequence.timer) {
  //     elapsed = Math.abs(elem.sequence.timer.started - new Date())
  //     window.clearTimeout(elem.sequence.timer)
  //   }

  //   // Start a new timer.
  //   elem.sequence.timer = { started: new Date() }
  //   elem.sequence.timer.clock = window.setTimeout(function () {
  //     // Sequence interval has passed, so unblock the sequence and re-run the handler.
  //     sequence.blocked = false
  //     elem.sequence.timer = null
  //     _handler()
  //   }, Math.abs(sequence.interval) + delay - elapsed)
  // }

  // function _queueCallback (type, elem, delayed) {
  //   var elapsed = 0
  //   var duration = 0
  //   var callback = 'after'

  //   // Check which callback we’re working with.
  //   switch (type) {
  //     case 'reveal':
  //       duration = elem.config.duration
  //       if (delayed) {
  //         duration += elem.config.delay
  //       }
  //       callback += 'Reveal'
  //       break

  //     case 'reset':
  //       duration = elem.config.duration
  //       callback += 'Reset'
  //       break
  //   }

  //   // If a timer is already running, capture the elapsed time and clear it.
  //   if (elem.timer) {
  //     elapsed = Math.abs(elem.timer.started - new Date())
  //     window.clearTimeout(elem.timer.clock)
  //   }

  //   // Start a new timer.
  //   elem.timer = { started: new Date() }
  //   elem.timer.clock = window.setTimeout(function () {
  //     // The timer completed, so let’s fire the callback and null the timer.
  //     elem.config[callback](elem.domEl)
  //     elem.timer = null
  //   }, duration - elapsed)
  // }

  function _shouldReveal(elem) {
    if (elem.sequence) {
      var sequence = sr.sequences[elem.sequence.id];
      return sequence.active && !sequence.blocked && !elem.revealing && !elem.disabled;
    }
    return _isElemVisible(elem) && !elem.revealing && !elem.disabled;
  }

  // function _shouldUseDelay (elem) {
  //   var config = elem.config.useDelay
  //   return config === 'always' ||
  //     (config === 'onload' && !sr.initialized) ||
  //     (config === 'once' && !elem.seen)
  // }

  function _shouldReset(elem) {
    if (elem.sequence) {
      var sequence = sr.sequences[elem.sequence.id];
      return !sequence.active && elem.config.reset && elem.revealing && !elem.disabled;
    }
    return !_isElemVisible(elem) && elem.config.reset && elem.revealing && !elem.disabled;
  }

  function _getContainer(container) {
    return {
      width: container.clientWidth,
      height: container.clientHeight
    };
  }

  function _getScrolled(container) {
    // Return the container scroll values, plus the its offset.
    if (container && container !== window.document.documentElement) {
      var offset = _getOffset(container);
      return {
        x: container.scrollLeft + offset.left,
        y: container.scrollTop + offset.top
      };
    } else {
      // Otherwise, default to the window object’s scroll values.
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }
  }

  function _getOffset(domEl) {
    var offsetTop = 0;
    var offsetLeft = 0;

    // Grab the element’s dimensions.
    var offsetHeight = domEl.offsetHeight;
    var offsetWidth = domEl.offsetWidth;

    // Now calculate the distance between the element and its parent, then
    // again for the parent to its parent, and again etc... until we have the
    // total distance of the element to the document’s top and left origin.
    do {
      if (!isNaN(domEl.offsetTop)) {
        offsetTop += domEl.offsetTop;
      }
      if (!isNaN(domEl.offsetLeft)) {
        offsetLeft += domEl.offsetLeft;
      }
      domEl = domEl.offsetParent;
    } while (domEl);

    return {
      top: offsetTop,
      left: offsetLeft,
      height: offsetHeight,
      width: offsetWidth
    };
  }

  function _isElemVisible(elem) {
    var offset = _getOffset(elem.domEl);
    var container = _getContainer(elem.config.container);
    var scrolled = _getScrolled(elem.config.container);
    var vF = elem.config.viewFactor;

    // Define the element geometry.
    var elemHeight = offset.height;
    var elemWidth = offset.width;
    var elemTop = offset.top;
    var elemLeft = offset.left;
    var elemBottom = elemTop + elemHeight;
    var elemRight = elemLeft + elemWidth;

    return confirmBounds() || isPositionFixed();

    function confirmBounds() {
      // Define the element’s functional boundaries using its view factor.
      var top = elemTop + elemHeight * vF;
      var left = elemLeft + elemWidth * vF;
      var bottom = elemBottom - elemHeight * vF;
      var right = elemRight - elemWidth * vF;

      // Define the container functional boundaries using its view offset.
      var viewTop = scrolled.y + elem.config.viewOffset.top;
      var viewLeft = scrolled.x + elem.config.viewOffset.left;
      var viewBottom = scrolled.y - elem.config.viewOffset.bottom + container.height;
      var viewRight = scrolled.x - elem.config.viewOffset.right + container.width;

      return top < viewBottom && bottom > viewTop && left > viewLeft && right < viewRight;
    }

    function isPositionFixed() {
      return window.getComputedStyle(elem.domEl).position === 'fixed';
    }
  }

  /**
   * Utilities
   * ---------
   */

  function Tools() {}

  Tools.prototype.isObject = function (object) {
    return object !== null && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Object;
  };

  Tools.prototype.isNode = function (object) {
    return _typeof(window.Node) === 'object' ? object instanceof window.Node : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
  };

  Tools.prototype.isNodeList = function (object) {
    var prototypeToString = Object.prototype.toString.call(object);
    var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;

    return _typeof(window.NodeList) === 'object' ? object instanceof window.NodeList : object && (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && regex.test(prototypeToString) && typeof object.length === 'number' && (object.length === 0 || this.isNode(object[0]));
  };

  Tools.prototype.forOwn = function (object, callback) {
    if (!this.isObject(object)) {
      throw new TypeError('Expected "object", but received "' + (typeof object === 'undefined' ? 'undefined' : _typeof(object)) + '".');
    } else {
      for (var property in object) {
        if (object.hasOwnProperty(property)) {
          callback(property);
        }
      }
    }
  };

  Tools.prototype.extend = function (target, source) {
    this.forOwn(source, function (property) {
      if (this.isObject(source[property])) {
        if (!target[property] || !this.isObject(target[property])) {
          target[property] = {};
        }
        this.extend(target[property], source[property]);
      } else {
        target[property] = source[property];
      }
    }.bind(this));
    return target;
  };

  Tools.prototype.extendClone = function (target, source) {
    return this.extend(this.extend({}, target), source);
  };

  Tools.prototype.isMobile = function () {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  };

  /**
   * Polyfills
   * --------
   */

  _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

  /**
   * Module Wrapper
   * --------------
   */
  if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {
    define(function () {
      return ScrollReveal;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollReveal;
  } else {
    window.ScrollReveal = ScrollReveal;
  }
})();
"use strict";

// =============================================================================
// Sidebar behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Layout = function Layout(config) {

		var layout = {
			props: Object.assign({
				target: ".layout__wrapper",
				toggle: ".toggle__sidebar",
				collapsedClass: "is--collapsed"
			}, config),
			state: {
				element: null,
				toggle: null
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					if (this.state.toggle = this.state.element.querySelector(this.props.toggle)) {
						this.state.toggle.addEventListener('click', function (e) {
							e.preventDefault();
							e.stopPropagation();
							_this.handleClick();
						});
					} else {
						return false;
					}
				} else {
					return false;
				}
			},
			handleClick: function handleClick() {
				this.state.element.classList.toggle(this.props.collapsedClass);
			}
		};

		return layout;
	};

	window.Layout = Layout;
})(window);
'use strict';

// =============================================================================
// Smooth scroll
// =============================================================================

;(function (window) {

	'use strict';

	var Smooth = function Smooth(config) {

		var smooth = {
			props: Object.assign({
				target: "body",
				duration: 750
			}, config),
			state: {
				container: null
			},
			init: function init() {
				var _this = this;

				if (this.state.container = document.querySelector(this.props.target)) {
					document.addEventListener('click', function (e) {
						if (e.target.getAttribute('href') && e.target.getAttribute('href').charAt(0) === '#') {
							e.preventDefault();
							e.stopPropagation();
							_this.handleClick(e.target);
							_this.changeURL(e.target);
						}
					});
				} else {
					return;
				}
			},
			handleClick: function handleClick(el) {
				if (this.state.container.querySelector(el.getAttribute('href'))) {
					this.smoothScroll(this.state.container.querySelector(el.getAttribute('href')).getBoundingClientRect().top + window.scrollY);
				} else {
					return;
				}
			},
			smoothScroll: function smoothScroll(to) {
				var _this2 = this;

				var startTime = window.performance.now();
				var endTime = startTime + this.props.duration;
				var start = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
				var animateScroll = function animateScroll() {
					var now = window.performance.now();
					_this2.state.container.scrollTop = _this2.easeInQuint(now - startTime, start, to - start, _this2.props.duration);
					if (now < endTime) {
						requestAnimationFrame(animateScroll);
					}
				};
				animateScroll();
			},
			easeInQuint: function easeInQuint(t, b, c, d) {
				var ts = (t /= d) * t;
				var tc = ts * t;
				return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
			},
			changeURL: function changeURL(target) {
				if (history.pushState) {
					history.pushState({}, "", target.getAttribute('href'));
				} else {
					location.hash = target.getAttribute('href');
				}
			}
		};

		return smooth;
	};

	window.Smooth = Smooth;
})(window);
"use strict";

// =============================================================================
// Sticky behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Sticky = function Sticky(config) {

		var sticky = {
			props: Object.assign({
				target: "#sticky",
				stickyClass: "sticky"
			}, config),
			state: {
				element: {},
				isAdded: false
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					this.state.element.elPosition = this.state.element.getBoundingClientRect();
					this.state.element.elPositionTop = window.pageYOffset - this.state.element.elPosition.top * -1;

					this.state.element.placeholder = document.createElement('div');
					this.state.element.placeholder.style.width = this.state.element.elPosition.width + 'px';
					this.state.element.placeholder.style.height = this.state.element.elPosition.height + 'px';

					document.addEventListener('scroll', tools.throttle(function (e) {
						_this.handleScroll();
					}, 250));
				} else {
					return;
				}
			},
			handleScroll: function handleScroll() {
				if (window.pageYOffset >= this.state.element.elPositionTop && !this.state.isAdded) {
					this.stickElement();
				} else if (window.pageYOffset < this.state.element.elPositionTop && this.state.isAdded) {
					this.unstickElement();
				}
			},
			stickElement: function stickElement() {
				this.state.element.classList.add(this.props.stickyClass);
				this.state.element.parentNode.insertBefore(this.state.element.placeholder, this.state.element);
				this.state.isAdded = true;
			},
			unstickElement: function unstickElement() {
				this.state.element.classList.remove(this.props.stickyClass);
				this.state.element.parentNode.removeChild(this.state.element.placeholder);
				this.state.isAdded = false;
			}
		};

		return sticky;
	};

	window.Sticky = Sticky;
})(window);
"use strict";

// =============================================================================
// Tabs behaviour
// =============================================================================

;(function (window) {

	'use strict';

	var Tabs = function Tabs(config) {

		var tabs = {
			props: Object.assign({
				target: "#tabs",
				tabsControl: ".tabs__control",
				tabsContent: ".tabs__content",
				activeClass: "is--active"
			}, config),
			state: {
				element: null,
				activeIndex: 0
			},
			init: function init() {
				var _this = this;

				if (this.state.element = document.querySelector(this.props.target)) {
					this.state.element.tabsControl = this.state.element.querySelector(this.props.tabsControl).childNodes;
					this.state.element.tabsContent = this.state.element.querySelector(this.props.tabsContent).childNodes;
					var i = this.state.element.tabsControl.length;
					var _loop = function _loop() {
						var index = i;
						_this.state.element.tabsControl[i].addEventListener('click', function (e) {
							e.preventDefault();
							_this.goToTab(index);
						});
					};

					while (i--) {
						_loop();
					}
				} else {
					return false;
				}
			},
			goToTab: function goToTab(index) {
				if (index !== this.state.activeIndex && index >= 0 && index <= this.state.element.tabsControl.length) {
					this.state.element.tabsControl[this.state.activeIndex].classList.remove(this.props.activeClass);
					this.state.element.tabsContent[this.state.activeIndex].classList.remove(this.props.activeClass);
					this.state.element.tabsControl[index].classList.add(this.props.activeClass);
					this.state.element.tabsContent[index].classList.add(this.props.activeClass);
					this.state.activeIndex = index;
				}
			}
		};

		return tabs;
	};

	window.Tabs = Tabs;
})(window);
"use strict";

// =============================================================================
// Typed
// =============================================================================

;(function (window) {

	'use strict';

	var Typed = function Typed(config) {

		var typed = {
			props: Object.assign({
				target: ".typed",
				loop: false,
				speed: 150,
				text: []
			}, config),
			state: {
				element: null,
				timeout: null,
				arrayPos: 0,
				stringPos: 0
			},
			init: function init() {
				if (this.state.element = document.querySelector(this.props.target)) {
					this.write(this.props.text[this.state.arrayPos], this.state.stringPos);
				} else {
					return;
				}
			},
			write: function write(string, index) {
				var _this = this;

				if (this.state.arrayPos < this.props.text.length) {
					this.timeout = setTimeout(function () {
						if (_this.state.stringPos < string.length) {
							_this.state.element.textContent = string.substr(0, index + 1);
							_this.state.stringPos++;
							_this.write(_this.props.text[_this.state.arrayPos], _this.state.stringPos);
						} else {
							setTimeout(function () {
								_this.delete(_this.props.text[_this.state.arrayPos], _this.state.stringPos);
							}, _this.props.speed * 4);
						}
					}, Math.round(Math.random() * (100 - 30)) + this.props.speed);
				} else {
					return;
				}
			},
			delete: function _delete(string, index) {
				var _this2 = this;

				if (this.state.arrayPos < this.props.text.length - 1) {
					this.timeout = setTimeout(function () {
						if (_this2.state.stringPos >= 0) {
							_this2.state.element.textContent = string.substr(0, index);
							_this2.state.stringPos--;
							_this2.delete(_this2.props.text[_this2.state.arrayPos], _this2.state.stringPos);
						} else {
							_this2.state.arrayPos++;
							_this2.write(_this2.props.text[_this2.state.arrayPos], _this2.state.stringPos);
						}
					}, this.props.speed / 4);
				} else if (this.props.loop) {
					this.timeout = setTimeout(function () {
						if (_this2.state.stringPos >= 0) {
							_this2.state.element.textContent = string.substr(0, index);
							_this2.state.stringPos--;
							_this2.delete(_this2.props.text[_this2.state.arrayPos], _this2.state.stringPos);
						} else {
							_this2.state.arrayPos = 0;
							_this2.state.strongPos = 0;
							_this2.write(_this2.props.text[_this2.state.arrayPos], _this2.state.stringPos);
						}
					}, this.props.speed / 4);
				} else {
					return;
				}
			}
		};

		return typed;
	};

	window.Typed = Typed;
})(window);
// =============================================================================
// Bricks.js
// =============================================================================

//
// Collection of scripts used by the framework
//

'use strict';

// Intro message

var styles = ['background-color: #ea2e42', 'color: white', 'line-height: 40px', 'font-weight: bold', 'padding: 10px 0'].join(';');

console.log('%c Oh hello, nice to meet you. If you have any feedback or suggestions, send them to @mrozilla :) ', styles);

// =============================================================================
// Mark page as DOMloaded
// =============================================================================

if (document.readyState != 'loading') {
	document.body.classList.add('is--loaded');
} else {
	document.addEventListener('DOMContentLoaded', document.body.classList.add('is--loaded'));
}

// =============================================================================
// Hiding navbar
// =============================================================================

var navbar = new Navbar();
navbar.init();

// =============================================================================
// Forms
// =============================================================================

var form = new Form();
form.init();

// =============================================================================
// ScrollReveal settings
// =============================================================================

var sr = new ScrollReveal({ reset: true });
sr.reveal('.scrollReveal');

// =============================================================================
// Smooth scroll
// =============================================================================

var smooth = new Smooth();
smooth.init();

// =============================================================================
// Typed.js settings
// =============================================================================

var typed = new Typed({
	text: ["framework.", "helper.", "friend."],
	loop: true
});
typed.init();

// =============================================================================
// Blog Image behaviour
// =============================================================================

var blogImages = new Click();
blogImages.init();

// =============================================================================
// Highlight.js init
// =============================================================================

hljs.initHighlightingOnLoad();

// =============================================================================
// Tabs init
// =============================================================================

var tabs1 = new Tabs({ target: '#tabs1' });
var tabs2 = new Tabs({ target: '#tabs2' });
tabs1.init();
tabs2.init();

// =============================================================================
// Sticky init
// =============================================================================

var sticky = new Sticky();
sticky.init();

// =============================================================================
// Layout init
// =============================================================================

var layout = new Layout();
layout.init();

// =============================================================================
// Blog behaviour
// =============================================================================

var blog = new Blog();
blog.init();
//# sourceMappingURL=main.js.map
