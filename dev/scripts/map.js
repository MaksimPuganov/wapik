function init_map() {
    var myOptions = {
        zoom:16,
        center:new google.maps.LatLng(42.2616788,-85.61586119999998),
        mapTypeId: google.maps.MapTypeId.ROADMAP};

        map = new google.maps.Map(document.getElementById('gmap_canvas'),myOptions);
    }
google.maps.event.addDomListener(window, 'load', init_map)
