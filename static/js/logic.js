var mapbox = "https://api.mapbox.com/styles/v1/enassi/cjeojkdsr6ghf2sp346vuxyl9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZW5hc3NpIiwiYSI6ImNqZWo2YXk2bDJwbnozOW83Y3A2bTUxYmkifQ.RFMxc-rS7DhCPJvlaTQUTA";

var myMap = L.map("map", {
         center: [37.09, -95.71],
          zoom: 5,
});

var eventDataStart = [];
var eventDataEnd = [];

L.tileLayer(mapbox).addTo(myMap);

d3.json("/maps", function (error, eventdata) {
    if (error) return console.warn(error); 
    console.log(eventdata);

    for (var i = 0; i < eventdata.length; i++) {
    
        L.marker([eventdata[i].Latitude, eventdata[i].Longitude])
            .bindPopup("<h1>" + eventdata[i].Name + "</h1> <hr> <h3>Venue " + eventdata[i].Venue + 
                        "</h1> <hr> <h3>Genre " + eventdata[i].Subgenre +"</h3>")
            .addTo(myMap);
    }
});