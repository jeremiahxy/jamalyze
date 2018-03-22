
function getdata() {
	var description =[];
	Plotly.d3.json("/maps", function (error, response) {
		if (error) return console.warn(error);
		eventsdata = response;
		console.log(eventsdata);
 })
};


// var eventsMarkers = [];

// for (var i = 0; i < eventsdata.length; i++) {
//   // loop through the cities array, create a new marker, push it to the cityMarkers array
//   cityMarkers.push(
//     L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
//   );
// }

// function createFeatures(earthquakeData){
//     // Function for each feature to be added as a popup describing the content in the popup
//     function onEachFeature(feature,layer){
//         layer.bindPopup("<h3>Place: " + feature.properties.place +
//         "</h3><hr><h3>Magnitude: "+ feature.properties.mag +
//         "</h3><hr><h3>Time: " + new Date(feature.properties.time) + "</h3>")
//     }

//     // Converting the earthquake data to geoJSON and setting the marker as circleMarkers 
//     var earthquakes= L.geoJSON(earthquakeData,{
//         onEachFeature: onEachFeature,
//         pointToLayer: function(feature,latlng){
//             return L.circleMarker(latlng,{
//                 radius: markersize(feature["properties"]["mag"]),
//                 color: markercolor(feature["properties"]["mag"]),
//                 weight: 1,
//                 opacity: 1,
//                 fillOpacity: 0.8

//             });
//         }
//     });
//   // Sending our earthquakes layer to the createMap function
//   createMap(earthquakes);
// }


// function markersize(magnitude) {
//   return magnitude * 5;
// }

// function markercolor(magnitude){
//     if(magnitude>=0 & magnitude<=1){
//         return "#80ff00";
//     }
//     else if(magnitude>1 & magnitude<=2){
//         return "#bfff00";
//     }
//     else if(magnitude>2 & magnitude<=3){
//         return "#ffff00";
//     }
//     else if(magnitude>3 & magnitude<=4){
//         return "#ffbf00";
//     }
//     else if(magnitude>4 & magnitude<=5){
//         return "#ffbf00";
//     }
//     else if(magnitude>5){
//         return "#ff4000";
//     }
// }


// function createMap(earthquakes) {

//   // Define streetmap and darkmap layers
//   var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/suvithala/cjeyil7ri1fbr2so59e01iq3w/tiles/256/{z}/{x}/{y}?" +
//                               "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ");

//   var greyscale = L.tileLayer("https://api.mapbox.com/styles/v1/suvithala/cjeyikli4252h2rqiz9vlphyc/tiles/256/{z}/{x}/{y}?" +
//                             "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ");

//   var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/suvithala/cjeyisicj1fwf2rt6jsma27c4/tiles/256/{z}/{x}/{y}?" +
//                               "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ");

//   // Define a baseMaps object to hold our base layers
//   var baseMaps = {
//     "Grey Scale": greyscale,
//     "Outdoors": outdoors,
//     "Satellite": satellite
//   };

//   var plates = new L.LayerGroup();

//   d3.json(platesUrl,function(data){
//         L.geoJSON(data,{
//             color:"blue", 
//             weight: 2
//         }).addTo(plates);            
//     })
//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     "Earthquakes": earthquakes,
//     "Tectonic Plates": plates
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load
//   var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5,
//     layers: [greyscale, earthquakes, plates]
//   });

  
//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map

//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
 
  



