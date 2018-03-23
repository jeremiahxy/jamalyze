
var mapbox = "https://api.mapbox.com/styles/v1/suvithala/cjeyil7ri1fbr2so59e01iq3w/tiles/256/{z}/{x}/{y}?" +
              "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ";

var myMap = L.map("map", {
 		center: [37.09, -95.71],
 	 	zoom: 5,
});

L.tileLayer(mapbox).addTo(myMap);

Plotly.d3.json("/maps", function (error, response) {
	if (error) return console.warn(error); 
	// eventdata = JSON.parse(response);

	console.log(response);

	for (var i = 0; i < response.length; i++) {
	
		L.marker([response[i].Latitude, response[i].Longitude])
			.bindPopup("<h3><strong>" + response[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + response[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + response[i].Genre + "/" + response[i].Subgenre +"<strong></h4>")
    		.addTo(myMap);
	}
});




