// define globals
var weekly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var earthquakeIcon = {
  url: 'images/earthquake.png',
    // This marker is 20 pixels wide by 32 pixels high.
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
};

var shape = {
   coords: [1, 1, 1, 20, 18, 20, 18, 1],
   type: 'poly'
 };


$(document).ready(function() {
  console.log("Let's get coding!");

callAjax();

}); //end documentready


function onSubmitReqSuccess(json){
    var center ={lat: 30.2682, lng: -97.74295};

    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 3
    });

    json.features.forEach(function(earthquake){
      var titleSplit = earthquake.properties.title.split(" ");
      var protoTitleSplit = titleSplit.slice(6, titleSplit.length);


      $("#info").append(`<p>${protoTitleSplit.join(" ")}</p><p>${new Date(earthquake.properties.time)}</p>`);
      var pinlocations = {lat:earthquake.geometry.coordinates[1], lng: earthquake.geometry.coordinates[0]};

      var marker = new google.maps.Marker({
          position: pinlocations,
          map: map,
          title: 'Hello World',
          icon: earthquakeIcon,
          shape: shape
      });
    });
  }

function onError(xhr, status, errorThrown) {
      alert("Sorry, there was a problem!");
      console.log("Error: " + errorThrown);
      console.log("Status: " + status);
      console.dir(xhr);
  }

function callAjax() {
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
    dataType: 'json',
    success: onSubmitReqSuccess,
    error: onError
  });
}
