var mapbox = "https://api.mapbox.com/styles/v1/enassi/cjeojkdsr6ghf2sp346vuxyl9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5hc3NpIiwiYSI6ImNqZWo2YXk2bDJwbnozOW83Y3A2bTUxYmkifQ.RFMxc-rS7DhCPJvlaTQUTA";

//Add new layer for all plots
//var allConcerts = new L.LayerGroup();

//Add new layer for cluster map
var clusters = new L.LayerGroup();

//Add new layer for heatmap
var heatMap = new L.LayerGroup();

// Create overlay object to hold our overlay layer
var overlayMaps = {
  //"All Concerts": allConcerts,
  "Concert Clusters": clusters,
  "Heatmap": heatMap,
};

var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3,
  layers: [clusters]
});

var baseMap = L.tileLayer(mapbox).addTo(myMap);

//Plot all points for all concerts
d3.json("/maps", function (error, response) {
  if (error) return console.warn(error);
  // eventdata = JSON.parse(response);
  //Clustermap
  // Grabbing the data with d3..
  console.log(response)
  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through our data...
  for (var i = 0; i < response.length; i++) {

    // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([response[i].Latitude, response[i].Longitude])
        .bindPopup(response[i].Venue))
      .addTo(clusters);
  };

  /* function getIcon(genre) {
    if (genre == "Rock") {
      console.log(genre);
      return '../static/images/a6cee3.png';

    } else if (genre == "Pop") {
      return '../static/images/1f78b4.png';
    } else if (genre == "Metal") {
      return '../static/images/b2df8a.png';
    } else if (genre == "Hip-Hop/Rap") {
      return '../static/images/33a02c.png';
    } else if (genre == "Dance/Electronic") {
      return '../static/images/fb9a99.png';
    } else if (genre == "Country") {
      return '../static/images/e31a1c.png';
    } else if (genre == "Alternative") {
      return '../static/images/fdbf6f.png';
    } else {
      return '../static/images/a6cee3.png'
    }
  }

  for (var i = 0; i < response.length; i++) {
    var greenIcon = L.icon({
      iconUrl: getIcon(response[i].Genre),
      iconSize: [17, 25], // size of the icon
      iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    L.marker([response[i].Latitude, response[i].Longitude], {
        icon: greenIcon
      })
      .bindPopup("<h3><strong>" + response[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + response[i].Venue +
        "<strong></h4> <hr> <h4><strong>Genre: " + response[i].Genre + "/" + response[i].Subgenre + "<strong></h4>")
      .addTo(allConcerts);
  };
 */
  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    heatArray.push([response[i].Latitude, response[i].Longitude])
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 15,
    gradient: {
      0.0: 'green',
      0.5: 'yellow',
      1.0: 'red'
    },
    minOpacity: 0.7
  }).addTo(heatMap)

  
});

L.control.layers(overlayMaps).addTo(myMap);