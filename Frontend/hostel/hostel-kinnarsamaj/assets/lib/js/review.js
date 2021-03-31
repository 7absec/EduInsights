! function(t) {
    var e, n = {
            className: "autosizejs",
            append: "",
            callback: !1,
            resizeDelay: 10
        },
        i = '<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',
        o = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        s = t(i).data("autosize", !0)[0];
    s.style.lineHeight = "99px", "99px" === t(s).css("lineHeight") && o.push("lineHeight"), s.style.lineHeight = "", t.fn.autosize = function(i) {
        return this.length ? (i = t.extend({}, n, i || {}), s.parentNode !== document.body && t(document.body).append(s), this.each(function() {
            function n() {
                var e, n;
                "getComputedStyle" in window ? (e = window.getComputedStyle(d, null), n = d.getBoundingClientRect().width, t.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(t, i) {
                    n -= parseInt(e[i], 10)
                }), s.style.width = n + "px") : s.style.width = Math.max(p.width(), 0) + "px"
            }

            function r() {
                var r = {};
                if (e = d, s.className = i.className, c = parseInt(p.css("maxHeight"), 10), t.each(o, function(t, e) {
                        r[e] = p.css(e)
                    }), t(s).css(r), n(), window.chrome) {
                    var a = d.style.width;
                    d.style.width = "0px", d.offsetWidth, d.style.width = a
                }
            }

            function a() {
                var t, o;
                e !== d ? r() : n(), s.value = d.value + i.append, s.style.overflowY = d.style.overflowY, o = parseInt(d.style.height, 10), s.scrollTop = 0, s.scrollTop = 9e4, t = s.scrollTop, c && t > c ? (d.style.overflowY = "scroll", t = c) : (d.style.overflowY = "hidden", u > t && (t = u)), t += f, o !== t && (d.style.height = t + "px", g && i.callback.call(d, d))
            }

            function l() {
                clearTimeout(h), h = setTimeout(function() {
                    var t = p.width();
                    t !== y && (y = t, a())
                }, parseInt(i.resizeDelay, 10))
            }
            var c, u, h, d = this,
                p = t(d),
                f = 0,
                g = t.isFunction(i.callback),
                w = {
                    height: d.style.height,
                    overflow: d.style.overflow,
                    overflowY: d.style.overflowY,
                    wordWrap: d.style.wordWrap,
                    resize: d.style.resize
                },
                y = p.width();
            p.data("autosize") || (p.data("autosize", !0), ("border-box" === p.css("box-sizing") || "border-box" === p.css("-moz-box-sizing") || "border-box" === p.css("-webkit-box-sizing")) && (f = p.outerHeight() - p.height()), u = Math.max(parseInt(p.css("minHeight"), 10) - f || 0, p.height()), p.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word",
                resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal"
            }), "onpropertychange" in d ? "oninput" in d ? p.on("input.autosize keyup.autosize", a) : p.on("propertychange.autosize", function() {
                "value" === event.propertyName && a()
            }) : p.on("input.autosize", a), i.resizeDelay !== !1 && t(window).on("resize.autosize", l), p.on("autosize.resize", a), p.on("autosize.resizeIncludeStyle", function() {
                e = null, a()
            }), p.on("autosize.destroy", function() {
                e = null, clearTimeout(h), t(window).off("resize", l), p.off("autosize").off(".autosize").css(w).removeData("autosize")
            }), a())
        })) : this
    }
}(window.jQuery || window.$);
var __slice = [].slice;
! function(t) {
    var e;
    return e = function() {
        function e(e, n) {
            var i, o, s, r = this;
            this.options = t.extend({}, this.defaults, n), this.$el = e, s = this.defaults;
            for (i in s) o = s[i], null != this.$el.data(i) && (this.options[i] = this.$el.data(i));
            this.createStars(), this.syncRating(), this.$el.on("mouseover.starrr", "span", function(t) {
                return r.syncRating(r.$el.find("span").index(t.currentTarget) + 1)
            }), this.$el.on("mouseout.starrr", function() {
                return r.syncRating()
            }), this.$el.on("click.starrr", "span", function(t) {
                return r.setRating(r.$el.find("span").index(t.currentTarget) + 1)
            }), this.$el.on("starrr:change", this.options.change)
        }
        return e.prototype.defaults = {
            rating: void 0,
            numStars: 5,
            change: function() {}
        }, e.prototype.createStars = function() {
            var t, e, n;
            for (n = [], t = 1, e = this.options.numStars; e >= 1 ? e >= t : t >= e; e >= 1 ? t++ : t--) n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"));
            return n
        }, e.prototype.setRating = function(t) {
            return this.options.rating === t && (t = void 0), this.options.rating = t, this.syncRating(), this.$el.trigger("starrr:change", t)
        }, e.prototype.syncRating = function(t) {
            var e, n, i, o;
            if (t || (t = this.options.rating), t)
                for (e = n = 0, o = t - 1; o >= 0 ? o >= n : n >= o; e = o >= 0 ? ++n : --n) this.$el.find("span").eq(e).removeClass("glyphicon-star-empty").addClass("glyphicon-star");
            if (t && 5 > t)
                for (e = i = t; 4 >= t ? 4 >= i : i >= 4; e = 4 >= t ? ++i : --i) this.$el.find("span").eq(e).removeClass("glyphicon-star").addClass("glyphicon-star-empty");
            return t ? void 0 : this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty")
        }, e
    }(), t.fn.extend({
        starrr: function() {
            var n, i;
            return i = arguments[0], n = 2 <= arguments.length ? __slice.call(arguments, 1) : [], this.each(function() {
                var o;
                return o = t(this).data("star-rating"), o || t(this).data("star-rating", o = new e(t(this), i)), "string" == typeof i ? o[i].apply(o, n) : void 0
            })
        }
    })
}(window.jQuery, window), $(function() {
    return $(".starrr").starrr()
}), $(function() {
    $("#new-review").autosize({
        append: "\n"
    });
    var t = $("#post-review-box"),
        e = $("#new-review"),
        n = $("#open-review-box"),
        i = $("#close-review-box"),
        o = $("#ratings-hidden");
    n.click(function() {
        t.slideDown(400, function() {
            $("#new-review").trigger("autosize.resize"), e.focus()
        }), n.fadeOut(100), i.show()
    }), i.click(function(o) {
        o.preventDefault(), t.slideUp(300, function() {
            e.focus(), n.fadeIn(200)
        }), i.hide()
    }), $(".starrr").on("starrr:change", function(t, e) {
        o.val(e)
    })
});