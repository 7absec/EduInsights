null == $.coverflow && ($.coverflow = {
        renderer: {},
        support: {}
    }),
    function(e, t, r, n) {
        function o(e, t) {
            return typeof e === t
        }

        function i(e, t) {
            return !!~("" + e).indexOf(t)
        }

        function f(e, t) {
            var r, o;
            for (r in e)
                if (o = e[r], !i(o, "-") && a[o] !== n) return "pfx" === t ? o : !0;
            return !1
        }

        function l(t, r, i) {
            var f, l;
            for (f in t)
                if (l = r[t[f]], l !== n) return i === !1 ? t[f] : o(l, "function") ? e.proxy(l, i || r) : l;
            return !1
        }

        function d(e, t, r) {
            var n = e.charAt(0).toUpperCase() + e.slice(1),
                i = (e + " " + m.join(n + " ") + n).split(" ");
            return o(t, "string") || o(t, "undefined") ? f(i, t) : (i = (e + " " + y.join(n + " ") + n).split(" "), l(i, t, r))
        }
        var s, u = r.documentElement,
            p = "coverflowjsfeaturedetection",
            c = r.createElement(p),
            a = c.style,
            v = "Webkit Moz O ms",
            m = v.split(" "),
            y = v.toLowerCase().split(" "),
            h = function(e, t, n, o) {
                var i, f, l, d, s = r.createElement("div"),
                    c = r.body,
                    a = c || r.createElement("body");
                if (parseInt(n, 10))
                    for (; n--;) l = r.createElement("div"), l.id = o ? o[n] : p + (n + 1), s.appendChild(l);
                return i = ["&#173;", "<style id='s", p, "'>", e, "</style>"].join(""), s.id = p, (c ? s : a).innerHTML += i, a.appendChild(s), c || (a.style.background = "", a.style.overflow = "hidden", d = u.style.overflow, u.style.overflow = "hidden", u.appendChild(a)), f = t(s, e), c ? s.parentNode.removeChild(s) : (a.parentNode.removeChild(a), u.style.overflow = d), !!f
            },
            w = {}.hasOwnProperty;
        s = o(w, "undefined") || o(w.call, "undefined") ? function(e, t) {
            return t in e && o(e.constructor.prototype[t], "undefined")
        } : function(e, t) {
            return w.call(e, t)
        }, e.coverflow.support.transform3d = function() {
            var e = !!d("perspective");
            return e && "webkitPerspective" in u.style && h("@media (transform-3d),(-webkit-transform-3d){#coverflowjsfeaturedetection{left:9px;position:absolute;height:3px;}}", function(t) {
                e = 9 === t.offsetLeft && 3 === t.offsetHeight
            }), e
        }(), null == e.support.transform3d && (e.support.transform3d = e.coverflow.support.transform3d)
    }(jQuery, this, this.document);