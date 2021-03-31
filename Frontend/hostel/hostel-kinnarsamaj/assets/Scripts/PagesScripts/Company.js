function initialize() {
    geocoder = new google.maps.Geocoder;
    var e = new google.maps.LatLng(23.02579, 72.58726),
        o = {
            zoom: 12,
            center: e,
            mapTypeControl: !0,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: !0,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    map = new google.maps.Map(document.getElementById("dvMap"), o), geocoder && (console.log("address : " + address), geocoder.geocode({
        address: address
    }, function(e, o) {
        if (o == google.maps.GeocoderStatus.OK && o != google.maps.GeocoderStatus.ZERO_RESULTS) {
            map.setCenter(e[0].geometry.location);
            var a = new google.maps.InfoWindow({
                    content: address,
                    size: new google.maps.Size(150, 50)
                }),
                t = new google.maps.Marker({
                    position: e[0].geometry.location,
                    map: map,
                    title: address
                });
            google.maps.event.addListener(t, "click", function() {
                a.open(map, t)
            })
        }
    }))
}
var geocoder, map, address;
$(document).ready(function() {
        address = document.getElementById("ContentPlaceHolder1_lblAddress").innerHTML, initialize()
    }), $(function() {
        $("#homeotherrank").addClass("thisactive"), $("#homethirdrank").addClass("thisactive"), $("#homefirstrank").addClass("thisactive"), $("#homefooter").addClass("thisactive")
    }), echo.init({
        callback: function(e, o) {
            "load" === o ? e.classList.add("loaded") : e.classList.remove("loaded")
        }
    }),
    function(e, o, a, t, n, s, d) {
        e.GoogleAnalyticsObject = n, e[n] = e[n] || function() {
            (e[n].q = e[n].q || []).push(arguments)
        }, e[n].l = 1 * new Date, s = o.createElement(a), d = o.getElementsByTagName(a)[0], s.async = 1, s.src = t, d.parentNode.insertBefore(s, d)
    }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-28541756-1", "auto"), ga("send", "pageview");