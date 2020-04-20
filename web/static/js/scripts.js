$(document).ready(function()
{
    APP.init($('[data-app=app]'));

    APP.boot();

    initMap();


});

function initMap() {
    var  map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
    });

    console.log(map);
}