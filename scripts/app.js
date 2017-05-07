// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  initMap();

  $.get(weekly_quakes_endpoint)
    .done(success)
    .fail(error);

});


function success(json){

  var quakeList = json.features;

  quakeList.forEach(function appendQuake(earthquake) {

    // grab the quake title from the json response
    var quakeDescription = earthquake.properties.title;
    $('#info').append(`<p>${quakeDescription}</p>`);

    // grab the coordinates from the json response
    var coords = earthquake.geometry.coordinates;
    var pos = {lat:coords[1] , lng: coords[0] };

    // place a marker on the map for every earthquake
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: './images/earthquake.png'
    });

  });

}

function error(a,b,c){
  $('#info').append('<h4>Unable to reach USGS Service. We\'re all dead.</h4>');
  console.log(a);
  console.log(b);
  console.log(c);
}

function initMap(){
        // Austin GA lat/long
        var pos = {lat: 30.2682, lng: -97.74295};
        map = new google.maps.Map(document.getElementById("map"), {
            center: pos,
            zoom: 5
        });

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: "./images/ga.png"
        });
    }
