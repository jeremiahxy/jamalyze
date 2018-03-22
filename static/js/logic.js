// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/enassi/cjeojkdsr6ghf2sp346vuxyl9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5hc3NpIiwiYSI6ImNqZWo2YXk2bDJwbnozOW83Y3A2bTUxYmkifQ.RFMxc-rS7DhCPJvlaTQUTA";

// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);

// Building API query URL

// Assembling API query URL

// Grabbing the data with d3..
d3.json("/maps", function (response) {
    console.log(response)
  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();


  // Loop through our data...
  for (var i = 0; i < response.length; i++) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([response[i].Latitude, response[i].Longitude])
      .bindPopup(response[i].venue));
    };


  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});