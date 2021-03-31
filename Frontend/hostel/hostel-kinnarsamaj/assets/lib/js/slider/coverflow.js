! function(e, i, t, r) {
    "use strict";

    function n(e, i) {
        var t;
        return function() {
            var r = this,
                n = arguments;
            t && clearTimeout(t), t = setTimeout(function() {
                e.apply(r, n), t = null
            }, i)
        }
    }
    var s = {
            transition: "transitionend",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            WebkitTransition: "webkitTransitionEnd",
            msTransition: "transitionend"
        },
        a = navigator.userAgent.toLowerCase(),
        o = function() {
            var e = /(msie) ([\w.]+)/.exec(a);
            return null !== e && e[1] && ~~e[2] < 10
        }();
    e.coverflow = e.extend(!0, {}, e.coverflow, {
        isAndroid: /android/.test(a),
        isOldie: o,
        transition: {
            easeInQuad: "cubic-bezier( .55,.085,.68,.53 )",
            easeInCubic: "cubic-bezier( .550, .055, .675, .190 )",
            easeInQuart: "cubic-bezier( .895, .03, .685, .22 )",
            easeInQuint: "cubic-bezier( .755, .05, .855, .06 )",
            easeInSine: "cubic-bezier( .47, 0, .745, .715 )",
            easeInExpo: "cubic-bezier( .95, .05, .795, .035 )",
            easeInCirc: "cubic-bezier( .6, .04, .98, .335 )",
            easeInBack: "cubic-bezier( .6, -.28, .735, .045 )",
            easeOutQuad: "cubic-bezier( .25,.46,.45,.94 )",
            easeOutCubic: "cubic-bezier( .215,.61,.355,1 )",
            easeOutQuart: "cubic-bezier( .165, .84, .44, 1 )",
            easeOutQuint: "cubic-bezier( .23, 1, .32, 1 )",
            easeOutSine: "cubic-bezier( .39, .575, .565, 1 )",
            easeOutExpo: "cubic-bezier( .19,1,.22,1 )",
            easeOutCirc: "cubic-bezier( .075, .82, .165, 1 )",
            easeOutBack: "cubic-bezier( .175, .885, .32, 1.275 )",
            easeInOutQuad: "cubic-bezier( .455, .03, .515, .955 )",
            easeInOutCubic: "cubic-bezier( .645, .045, .355, 1 )",
            easeInOutQuart: "cubic-bezier( .77, 0, .175, 1 )",
            easeInOutQuint: "cubic-bezier( .86, 0, .07, 1 )",
            easeInOutSine: "cubic-bezier( .445, .05, .55, .95 )",
            easeInOutExpo: "cubic-bezier( 1, 0, 0, 1 )",
            easeInOutCirc: "cubic-bezier( .785, .135, .15, .86 )",
            easeInOutBack: "cubic-bezier( .68, -.55, .265, 1.55 )"
        },
        renderer: {}
    }), e.widget("ui.coverflow", {
        options: {
            items: "> *",
            active: 0,
            duration: 400,
            easing: "easeOutQuint",
            angle: 45,
            perspectiveY: 45,
            scale: .7,
            overlap: .3,
            trigger: {
                itemfocus: !1,
                itemclick: !0,
                mousewheel: !0,
                swipe: !0
            }
        },
        isTicking: !1,
        _create: function() {
            var t, r, n = this,
                s = this.options,
                a = e.coverflow.support || {};
            n.elementOrigStyle = n.element.attr("style"), n.items = n.element.find(s.items).each(function() {
                var i = e(this);
                i.data({
                    coverflowOrigElemAttr: {
                        style: i.attr("style"),
                        "class": i.attr("class"),
                        tabIndex: i.attr("tabIndex")
                    }
                })
            }).addClass("ui-coverflow-item"), n._setDimensions(), n.support = a, t = a.transform && !o && null == i.opera && a.transform3d ? e.coverflow.renderer.ThreeD : e.coverflow.renderer.Classic, r = {
                angle: s.angle,
                perspectiveY: s.perspectiveY,
                scale: s.scale,
                overlap: s.overlap,
                itemSize: n.itemSize,
                outerWidth: n.outerWidth
            }, n.renderer = new t(n, n.element, n.items, r), n.element.addClass("ui-coverflow ui-coverflow-" + n.renderer.cssClass + "-render").parent().addClass("ui-coverflow-wrapper ui-clearfix"), s.trigger.itemfocus && this._bindFocus(), s.trigger.itemclick && n._on(n.items, {
                click: n._select
            }), s.trigger.mousewheel && n._on({
                mousewheel: n._onMouseWheel,
                DOMMouseScroll: n._onMouseWheel
            }), s.trigger.swipe && n._bindSwipe(), n.useJqueryAnimate = !(a.transition && e.isFunction(i.requestAnimationFrame)), n.coverflowrafid = 0
        },
        _bindFocus: function() {
            var e = this;
            e.items.prop("tabIndex", 0), e._on(e.items, {
                focus: e._select
            })
        },
        _bindSwipe: function() {
            var t = this,
                r = t.element,
                s = !1,
                a = !1;
            e.event.special && e.event.special.swipe && (s = !0, e.coverflow.isAndroid && (e.event.special.swipe.scrollSupressionThreshold = 0), e.event.special.swipe.handleSwipe = function(i, t) {
                var r = i.coords,
                    n = t.coords,
                    s = e.event.special.swipe;
                t.time - i.time < s.durationThreshold && Math.abs(r[0] - n[0]) > s.horizontalDistanceThreshold && Math.abs(r[1] - n[1]) < s.verticalDistanceThreshold && i.origin.trigger("swipe", {
                    swipestart: i,
                    swipestop: t
                }).trigger(i.coords[0] > t.coords[0] ? "swipeleft" : "swiperight", {
                    swipestart: i,
                    swipestop: t
                })
            }, t._on({
                swipe: n(t._handleJQmSwipe, 150)
            })), r.hammer && null != i.Hammer && (a = !0, r.hammer().on("drag swipe", function(e) {
                Hammer.utils.isVertical(e.gesture.direction) || e.gesture.preventDefault()
            }), t._on({
                swipe: t._handleHammerSwipe
            })), s || a || t._on({
                swipeleft: t.next,
                swiperight: t.prev
            })
        },
        _init: function() {
            var e = this,
                i = e.options;
            i.duration = ~~i.duration, i.duration < 1 && (i.duration = 1), e.currentIndex = e._isValidIndex(i.active, !0) ? i.active : 0, e.activeItem = e.items.removeClass("ui-state-active").eq(e.currentIndex).addClass("ui-state-active"), e._setDimensions(), e.renderer.initialize(), e._refresh(1, e._getFrom(), e.currentIndex), e._trigger("beforeselect", null, e._ui()), e._trigger("select", null, e._ui())
        },
        _setDimensions: function() {
            var e = this;
            e.itemWidth = e.items.width(), e.itemHeight = e.items.height(), e.itemSize = e.items.outerWidth(!0), e.outerWidth = e.element.parent().outerWidth(!1)
        },
        _isValidIndex: function(e, i) {
            return i = !!i, e = ~~e, (this.currentIndex !== e || i) && e > -1 && !!this.items.get(e)
        },
        _select: function(e) {
            this.select(e.currentTarget)
        },
        next: function() {
            return this.select(this.currentIndex + 1)
        },
        prev: function() {
            return this.select(this.currentIndex - 1)
        },
        _handleJQmSwipe: function(e, i) {
            var t = i.swipestart,
                r = i.swipestop,
                n = r.time - t.time,
                s = r.coords[0] - t.coords[0],
                a = s / n,
                o = 0 > s ? "left" : "right";
            this._handleSwipe(o, a)
        },
        _handleHammerSwipe: function(e) {
            var i = e.gesture;
            this._handleSwipe(i.direction, i.distance / i.deltaTime)
        },
        _handleSwipe: function(e, i) {
            var t, r, n = this;
            return t = n.outerWidth * Math.pow(i, 2) * .25, t /= n.itemWidth, t = Math.floor(t) * ("left" === e ? 1 : -1), r = n.currentIndex + t, t ? 0 > r ? void n.select(0) : n._isValidIndex(r) ? void n.select(r) : void n.select(n.items.length - 1) : void("left" === e ? n.next() : n.prev())
        },
        _getFrom: function() {
            var e = this;
            return Math.abs(e.previous - e.currentIndex) <= 1 ? e.previousIndex : e.currentIndex + (e.previousIndex < e.currentIndex ? -1 : 1)
        },
        select: function(t) {
            var r, n = this,
                a = n.options,
                o = isNaN(parseInt(t, 10)) ? n.items.index(t) : parseInt(t, 10);
            return n._isValidIndex(o) ? !1 === n._trigger("beforeselect", null, this._ui(n.items.eq(o), o)) ? !1 : (n.isTicking && (n.useJqueryAnimate ? n.element.stop(!0, !1) : (n.coverflowrafid && i.cancelAnimationFrame(n.coverflowrafid), n.element.unbind(s[n.support.transition]))), n.isTicking = !0, n.previousIndex = n.currentIndex, a.active = n.currentIndex = o, r = e.extend({}, n.renderer.select(), {
                coverflow: 1
            }), n.useJqueryAnimate ? n._animation(a, r) : (a = e.extend({
                duration: a.duration,
                easing: a.easing
            }, r), n._transition(a)), !0) : !1
        },
        _animation: function(i, t) {
            var r = this,
                n = this._getFrom();
            e.fx.step.coverflow = function(e) {
                r._refresh(e.now, n, r.currentIndex)
            }, r.element.animate(t, {
                duration: i.duration,
                easing: i.easing
            }).promise().done(function() {
                r._onAnimationEnd()
            })
        },
        _transition: function(t) {
            var r = this,
                n = new Date,
                a = r._getFrom(),
                o = r.currentIndex,
                c = {},
                u = function() {
                    var e = ((new Date).getTime() - n.getTime()) / t.duration;
                    e > 1 ? r.isTicking = !1 : r._refresh(e, a, o), r.isTicking && (r.coverflowrafid = i.requestAnimationFrame(u))
                };
            e.isFunction(r.renderer.getElementTransitionStyles) && (c = e.extend(c, r.renderer.getElementTransitionStyles(t))), r.element.one(s[r.support.transition], function() {
                r._refresh(1, a, o), r._onAnimationEnd()
            }).css(c), r.coverflowrafid = i.requestAnimationFrame(u)
        },
        _onAnimationEnd: function() {
            var e = this;
            e.coverflowrafid && cancelAnimationFrame(e.coverflowrafid), e.isTicking = !1, e.activeItem = e.items.removeClass("ui-state-active").eq(e.currentIndex).addClass("ui-state-active"), e._trigger("select", null, e._ui())
        },
        _refresh: function(e, i, t) {
            this.element.parent().scrollTop(0), this.renderer.refresh(e, i, t)
        },
        _ui: function(e, i) {
            return {
                active: e || this.activeItem,
                index: null != i ? i : this.currentIndex
            }
        },
        _onMouseWheel: function(e) {
            var i = e.originalEvent;
            return e.preventDefault(), i.wheelDelta > 0 || i.detail < 0 ? void this.prev() : void this.next()
        },
        _destroy: function() {
            var i = this;
            i.elementOrigStyle !== r ? i.element.attr("style", this.elementOrigStyle) : i.element.removeAttr("style"), i.element.removeClass("ui-coverflow ui-helper-clearfix ui-coverflow-" + (i.renderer.cssClass || "classic") + "-render").parent().removeClass("ui-coverflow-wrapper ui-clearfix"), i.items.removeClass("ui-coverflow-item ui-state-active").each(function() {
                var i = e(this),
                    t = i.data("coverflowOrigElemAttr");
                e.each(t, function(e, t) {
                    t !== r ? i.attr(e, t) : i.removeAttr(e)
                }), i.data("coverflowOrigElemAttr", null)
            }), i._super()
        }
    })
}(jQuery, this, this.document);