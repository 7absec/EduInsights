function debounce(n, t, u) {
    var e;
    return function() {
        function a() {
            u || n.apply(i, o), e = null
        }
        var i = this,
            o = arguments;
        e ? clearTimeout(e) : u && n.apply(i, o), e = setTimeout(a, t || 100)
    }
}