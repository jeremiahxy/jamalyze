
Plotly.d3.json("/maps", function (error, response) {	
	if (error) return console.warn(error); 
	
	var Popdata = [];
		$.each(response, function(){
    	if (this.Genre = 'Pop') {
        	Popdata.push(this)
        }
    })
    console.log(Popdata)

    

	var PopMarkers = [];

	for (var i = 0; i < Popdata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		PopMarkers.push(L.circle([Popdata[i].Latitude, Popdata[i].Longitude],{
  					color: "red",
  					fillColor: "red",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + Popdata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + Popdata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + Popdata[i].Genre + "/" + Popdata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
		var PopLayer = L.layerGroup(PopMarkers);


	var Rockdata = [];
		$.each(response, function(){
    	if (this.Genre = 'Rock') {
        	Rockdata.push(this)
        }
    })
    
    var RockMarkers = [];

	for (var i = 0; i < Rockdata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		RockMarkers.push(L.circle([Rockdata[i].Latitude, Rockdata[i].Longitude],{
  					color: "red",
  					fillColor: "red",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + Rockdata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + Rockdata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + Rockdata[i].Genre + "/" + Rockdata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
		var RockLayer = L.layerGroup(RockMarkers);


	var HipHopdata = [];
		$.each(response, function(){
    	if (this.Genre = 'Hip-Hop/Rap') {
        	HipHopdata.push(this)
        }
    })
    	
		var HipHopMarkers = [];

	for (var i = 0; i < HipHopdata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		HipHopMarkers.push(L.circle([HipHopdata[i].Latitude, HipHopdata[i].Longitude],{
  					color: "blue",
  					fillColor: "blue",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + HipHopdata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + HipHopdata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + HipHopdata[i].Genre + "/" + HipHopdata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
	var HipHopLayer = L.layerGroup(HipHopMarkers);

	var Countrydata = [];
		$.each(response, function(){
    	if (this.Genre = 'Country') {
        	Countrydata.push(this)
    	}
    })
    	
		var CountryMarkers = [];

	for (var i = 0; i < Countrydata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		CountryMarkers.push(L.circle([Countrydata[i].Latitude, Countrydata[i].Longitude],{
  					color: "yellow",
  					fillColor: "yellow",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + Countrydata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + Countrydata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + Countrydata[i].Genre + "/" + Countrydata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
	var CountryLayer = L.layerGroup(CountryMarkers);

	var Dancedata = [];
		$.each(response, function(){
    	if (this.Genre = 'Dance/Electronic') {
        	Dancedata.push(this)
        	return Dancedata;
    	}
    })
    	
		var DanceMarkers = [];

	for (var i = 0; i < Dancedata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		DanceMarkers.push(L.circle([Dancedata[i].Latitude, Dancedata[i].Longitude],{
  					color: "purple",
  					fillColor: "purple",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + Dancedata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + Dancedata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + Dancedata[i].Genre + "/" + Dancedata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
		var DanceLayer = L.layerGroup(DanceMarkers);



	var Alternativedata = [];
		$.each(response, function(){
    	if (this.Genre = 'Alternative') {
        	Alternativedata.push(this)
    	}
    })
    	
	var AlternativeMarkers = [];

	for (var i = 0; i < Alternativedata.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  		AlternativeMarkers.push(L.circle([Alternativedata[i].Latitude, Alternativedata[i].Longitude],{
  					color: "orange",
  					fillColor: "orange",
  					fillOpacity: 0.75,
  					radius: 50*500
  		}).bindPopup("<h3><strong>" + Alternativedata[i].Name + "</strong></h3> <hr> <h4><strong>Venue: " + Alternativedata[i].Venue + 
						"<strong></h4> <hr> <h4><strong>Genre: " + Alternativedata[i].Genre + "/" + Alternativedata[i].Subgenre +"<strong></h4>")
 	 	)}
  		
		var AlternativeLayer = L.layerGroup(AlternativeMarkers);

	var cities = L.tileLayer("https://api.mapbox.com/styles/v1/suvithala/cjeyikli4252h2rqiz9vlphyc/tiles/256/{z}/{x}/{y}?" +
                            "access_token=pk.eyJ1Ijoic3V2aXRoYWxhIiwiYSI6ImNqZWo2ZDdweDB4OXozM25sbDIyd2I3YTIifQ.rtsx7ta73EbOG-KVPodUpQ");

	var baseMaps = {
  	 	Cities: cities
	};

// Overlays that may be toggled on or off
	var overlayMaps = {
  		PopGenre: PopLayer,
  		RockGenre: RockLayer,
  		HipHop_RapGenre: HipHopLayer,
  		CountryGenre: CountryLayer,
  		DanceElectronicGenre: DanceLayer,
  		AlternativeGenre:  AlternativeLayer
	};
	
	var myMap = L.map("map", {
 		center: [37.09, -95.71],
 	 	zoom: 5,
 	 	layers: [cities, PopLayer, RockLayer, HipHopLayer, CountryLayer, AlternativeLayer]
	});
// Create map object and set default layers
// Pass our map layers into our layer control
// Add the layer control to the map
	L.control.layers(baseMaps, overlayMaps).addTo(myMap);
	
});


