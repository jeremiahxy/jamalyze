# Jamalyze!

What is the concert landscape of the United States for the next year? This application explores concert trends across the nation in regards to genre, price, and location. [View the application.](https://www.jamalyze.herokuapp.com)


 ### Configuration


 Data from the Ticketmaster API was configured to a SQLite database. A Flask server was created to return the different routes in a JSON format using SQLAlchemy. The response was used in the Javascript objects. The front end uses elements from Bootstrap and the [Grayscale bootstrap template](https://startbootstrap.com/template-overviews/grayscale/).

 ### Data
 * [Ticketmaster](https://developer.ticketmaster.com/)

### Requirements

#### Server
* Flask
* SQLAlchemy
* SQLite

#### Javascript
* Leaflet
* jQuery
* Mapbox
* D3
* Plotly
* [AOS](https://github.com/michalsnik/aos) (for CSS animations)

#### Contributors
* [Aswathy Mohan](https://github.com/AswathyMohan89)
* [Emily Nassi](https://github.com/emilynassi)
* [David O'Morrissey](https://github.com/davidomo)
* [Sujata Vithala](https://github.com/suvithala)