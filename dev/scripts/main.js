var showMenu = (function () {

    var init = function () {
        _setUpListners();
    };

    var _setUpListners = function () {
        // прослушка событий
        // document.getElementById("sidebar-toggle").addEventListener("click", toogleMenu);
        // function toogleMenu() {
        //     document.querySelector(".wrapper").classList.toggle("open-sidebar");
        // };

        function init_map() {
            var myOptions = {
                zoom:16,
                disableDefaultUI: true,
                scrollwheel: false,
                center:new google.maps.LatLng(42.2616788,-85.61586119999998),
                mapTypeId: google.maps.MapTypeId.ROADMAP};

                map = new google.maps.Map(document.getElementById('gmap_canvas'),myOptions);
            }
        google.maps.event.addDomListener(window, 'load', init_map);
    }

    return {
        init : init
    }
})();

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(showMenu.init);
