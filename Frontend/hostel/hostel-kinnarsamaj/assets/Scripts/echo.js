! function(t, e) {
    "function" == typeof define && define.amd ? define(function() {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e : t.echo = e(t)
}(this, function(t) {
    "use strict";
    var e, o, n, r, c, a = {},
        d = function() {},
        u = function(t, e) {
            var o = t.getBoundingClientRect();
            return o.right >= e.l && o.bottom >= e.t && o.left <= e.r && o.top <= e.b
        },
        i = function() {
            (r || !o) && (clearTimeout(o), o = setTimeout(function() {
                a.render(), o = null
            }, n))
        };
    return a.init = function(o) {
        o = o || {};
        var u = o.offset || 0,
            l = o.offsetVertical || u,
            f = o.offsetHorizontal || u,
            h = function(t, e) {
                return parseInt(t || e, 10)
            };
        e = {
            t: h(o.offsetTop, l),
            b: h(o.offsetBottom, l),
            l: h(o.offsetLeft, f),
            r: h(o.offsetRight, f)
        }, n = h(o.throttle, 250), r = o.debounce !== !1, c = !!o.unload, d = o.callback || d, a.render(), document.addEventListener ? (t.addEventListener("scroll", i, !1), t.addEventListener("load", i, !1)) : (t.attachEvent("onscroll", i), t.attachEvent("onload", i))
    }, a.render = function() {
        for (var o, n, r = document.querySelectorAll("img[data-echo], [data-echo-background]"), i = r.length, l = {
                l: 0 - e.l,
                t: 0 - e.t,
                b: (t.innerHeight || document.documentElement.clientHeight) + e.b,
                r: (t.innerWidth || document.documentElement.clientWidth) + e.r
            }, f = 0; i > f; f++) n = r[f], u(n, l) ? (c && n.setAttribute("data-echo-placeholder", n.src), null !== n.getAttribute("data-echo-background") ? n.style.backgroundImage = "url(" + n.getAttribute("data-echo-background") + ")" : n.src = n.getAttribute("data-echo"), c || (n.removeAttribute("data-echo"), n.removeAttribute("data-echo-background")), d(n, "load")) : c && (o = n.getAttribute("data-echo-placeholder")) && (null !== n.getAttribute("data-echo-background") ? n.style.backgroundImage = "url(" + o + ")" : n.src = o, n.removeAttribute("data-echo-placeholder"), d(n, "unload"));
        i || a.detach()
    }, a.detach = function() {
        document.removeEventListener ? t.removeEventListener("scroll", i) : t.detachEvent("onscroll", i), clearTimeout(o)
    }, a
});