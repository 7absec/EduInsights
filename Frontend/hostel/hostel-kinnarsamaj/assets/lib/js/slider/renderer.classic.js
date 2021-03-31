function ClassicRenderer(t, e, i, r) {
    var n = this;
    n.widget = t, n.element = e, n.items = i, n.options = r
}
null == $.coverflow && ($.coverflow = {
    renderer: {},
    support: {}
}), ClassicRenderer.prototype = {
    cssClass: "classic",
    itemMargin: 0,
    initialize: function() {
        var t = this,
            e = t.options,
            i = {},
            r = t.items.eq(t.widget.currentIndex);
        t.itemSize = r.width(), t.outerWidth = t.element.parent().outerWidth(!1), t.itemMargin = -Math.floor(e.overlap / 2 * r.innerWidth()), t.items.css({
            marginLeft: t.itemMargin,
            marginRight: t.itemMargin
        }), i.width = t.items.width() * t.items.length, $.extend(i, t._getCenterPosition()), t.element.css(i)
    },
    _getCenterPosition: function() {
        var t, e = this,
            i = e.itemSize,
            r = e.widget.currentIndex;
        return t = (e.outerWidth - i) / 2, t -= r * e.itemSize / 2, t += parseInt(e.element.css("paddingLeft"), 10) || 0, t -= r * e.itemMargin * 2, t -= e.itemMargin, t = Math.round(t), {
            left: t
        }
    },
    select: function() {
        return this._getCenterPosition()
    },
    getElementTransitionStyles: function(t) {
        var e = $.coverflow.transition[t.easing] || $.coverflow.transition.easeOutQuint;
        return $.extend(this._getCenterPosition(), {
            transition: "left " + t.duration + "ms " + e
        })
    },
    refresh: function(t, e, i) {
        var r = this,
            n = r.options,
            o = r.items.length,
            s = r.itemSize,
            a = r.itemMargin;
        this.items.each(function(l) {
            var f = l === i && 0 > e - i || l - i > 0 ? "left" : "right",
                m = l === i ? 1 - t : l === e ? t : 1,
                c = {
                    zIndex: o + ("left" === f ? i - l : l - i) + 10
                },
                d = 1 - m * (1 - n.scale),
                g = [d, m * ("right" === f ? -.15 : .15), 0, d, 0, 0];
            c.left = -l * (s / 2) + ("right" === f ? -s / 2 + s / 2 * n.overlap : s / 2 - s / 2 * n.overlap) * m, $.coverflow.isOldie && (l === i ? (c.left += a, c.top = 0) : c.top = Math.ceil(-a / 2)), r._transform(this, c, g), $(this).css(c)
        })
    },
    _transform: function() {
        var t = this;
        return $.coverflow.support.transform ? void t._matrixTransform.apply(t, arguments) : void($.coverflow.isOldie && t._fallbackTransform.apply(t, arguments))
    },
    _matrixTransform: function(t, e, i) {
        e.transform = "matrix(" + i.join(",") + ")"
    },
    _fallbackTransform: function(t, e, i) {
        t.filters["DXImageTransform.Microsoft.Matrix"] || (t.style.filter = (t.style.filter ? "" : " ") + 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand")');
        var r = t.filters["DXImageTransform.Microsoft.Matrix"];
        r.M11 = i[0], r.M12 = i[2], r.M21 = i[1], r.M22 = i[3]
    }
}, $.extend($.coverflow.renderer, {
    Classic: ClassicRenderer
});