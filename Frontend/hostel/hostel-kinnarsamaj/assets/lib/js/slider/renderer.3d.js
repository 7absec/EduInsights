function toRadian(e) {
    return parseFloat((.017453 * e).toFixed(6))
}

function ThreeDRenderer() {
    $.coverflow.renderer.Classic.apply(this, arguments)
}
null == $.coverflow && ($.coverflow = {
    renderer: {},
    support: {}
}), ThreeDRenderer.prototype = {
    cssClass: "3d",
    initialize: function() {
        var e = this,
            t = {};
        e.itemSize = e.items.eq(e.widget.currentIndex).outerWidth(!0), e.outerWidth = e.element.parent().outerWidth(!1), t.width = e.itemSize * e.items.length, $.extend(t, e._getCenterPosition(), e._getPerspectiveOrigin()), e.element.css(t)
    },
    getItemRenderedWidth: function() {
        var e = this.options;
        return Math.cos(toRadian(e.angle)) * this.itemSize * e.scale
    },
    _getPerspectiveOrigin: function() {
        var e = this,
            t = e.options;
        return {
            perspectiveOrigin: Math.round(e.itemSize / 2 + e.widget.currentIndex * e.getItemRenderedWidth() * (1 - t.overlap)) + "px " + t.perspectiveY + "%"
        }
    },
    _getCenterPosition: function() {
        var e, t = this,
            i = t.getItemRenderedWidth(),
            n = t.widget.currentIndex;
        return e = (t.outerWidth - t.itemSize) / 2, e -= n * i, e += n * i * t.options.overlap, e -= parseInt(t.element.css("paddingLeft"), 10) || 0, e = Math.round(e), {
            left: e
        }
    },
    select: function() {
        return $.extend({}, this._getCenterPosition(), this._getPerspectiveOrigin())
    },
    getElementTransitionStyles: function(e) {
        var t = this,
            i = $.coverflow.transition[e.easing] || $.coverflow.transition.easeOutQuint,
            n = {
                transitionProperty: "left",
                transitionDuration: e.duration + "ms",
                transitionTimingFunction: i,
                transitionDelay: "initial"
            };
        return $.extend(n, t._getCenterPosition(), t._getPerspectiveOrigin())
    },
    refresh: function(e, t, i) {
        var n = this,
            r = n.options,
            o = n.items.length,
            s = n.itemSize,
            a = n.getItemRenderedWidth();
        this.items.each(function(n) {
            var d, h = n === i && 0 > t - i || n - i > 0 ? "left" : "right",
                c = n === i ? 1 - e : n === t ? e : 1,
                l = {
                    zIndex: o + ("left" === h ? i - n : n - i) + 10
                },
                g = 1 - c * (1 - r.scale),
                u = "right" === h ? r.angle : -r.angle;
            u = toRadian(c * u), l.left = Math.round(-n * s + c * n * a * (1 - r.overlap) + (1 - c) * n * a * (1 - r.overlap)), d = [(g * Math.cos(u)).toFixed(6), 0, Math.sin(-u).toFixed(6), 0, 0, g, 0, 0, Math.sin(u).toFixed(6), 0, (g * Math.cos(u)).toFixed(6), 0, 0, 0, 0, 1], l.transform = "matrix3d(" + d.join(", ") + ")", l.transformOrigin = "right" === h ? "left center" : "right center", $(this).css(l)
        })
    }
}, $.extend($.coverflow.renderer, {
    ThreeD: ThreeDRenderer
});