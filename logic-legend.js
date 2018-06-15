//link for earthquake data for past 7 days
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// perform api call to the earthquake data API to get quake information. Call create markers when complete.
d3.json(url, createMarkers);

//function to set the fill color based on the magnitude of 
function getColor(d){
    if (d <= 1){return '#addd8e';}
    else if (d <= 2) {return '#fee391';}
    else if (d <= 3) {return '#feb24c';}
    else if (d <= 4) {return '#fd8d3c';}
    else if (d <= 5) {return '#f03b20';}
    else {return '#bd0026';}
}

function createMarkers(response){
    
    // pull the features property of the response
    var quake_features = response.features;
    
    //initialize an array to hold the quake markers
    var quakeMarkers = [];
    
    
    //loop thru the features array
    for (var i=0; i < quake_features.length; i++){
        var quakeLocation = quake_features[i].geometry;
        var radius = (quake_features[i].properties.mag)*10000;
        
        var markerOptions = {
        fillColor: getColor(quake_features[i].properties.mag),
        color: "white",
        weight:1,
        opacity: 1,
        fillOpacity: 0.8,
        radius: radius
        };
         
        // for each quake location, create a marker and bind a pop with properties
        
        var quakeMarker = L.circle([quakeLocation.coordinates[1], quakeLocation.coordinates[0]], markerOptions)
        .bindPopup("<h4> Place: "+quake_features[i].properties.place + "</h4> <hr> <h5> Magnitude : " + quake_features[i].properties.mag + "</h5");
        
        // add the quake marker to the quakeMarkers array
        quakeMarkers.push(quakeMarker);
    }
    
    //create a layer group made from the quakeMarkers array, pass it into createMap function
    createMap(L.layerGroup(quakeMarkers));
    
}

function createMap(earthquakes){
    // create a tile layer that will be the background of our map.
    var mapbox = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?' + 'access_token=pk.eyJ1IjoiamRrb3JhIiwiYSI6ImNqaTQyMm4xZzA0cmIzcXFjbjVoM3luNXMifQ.UHGTwkZ39ZhIV00yq-Y5Fw';

   /* styles = [
    'streets-v9',
    'satellite-streets-v9',
    'light-v9',
    'dark-v9',
    'outdoors-v9'
    ]
    
    var mapbox = 'https://api.mapbox.com/styles/v1/mapbox/' + styles[0] + '/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF0dGFseXRpY3MiLCJhIjoiY2podjEzNnltMHVnMDN1cGE1OWczMW5kdiJ9.p4Joc3qGh0zN6szhM9Mn9Q'
*/
    //create a tile layer
    var baseLayer = L.tileLayer(mapbox);
    
    // create a baseMaps object to hold the lightmap layer
      var baseMaps = {
        "Map": baseLayer
      };

    
    //create and overlayMaps object to hold the quakeLayer
    var overlayMaps = {
        "Earthquake Data": earthquakes
    };
    
    //create the map object with options
    var myMap = L.map('map', {
        center: [37.0902, -95.7129],
        zoom: 5,
        layers: [baseLayer, earthquakes]
    });
    
     // create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
    
     var legend = L.control({
      position: 'bottomright'
    });
    legend.onAdd = function() {

      var div = L.DomUtil.create('div', 'info legend'),
        quake_intensity = [0,1,2,3,4,5],
        labels = ['<strong> Earthquake Magnitude </strong>'];

     for (var i = 0; i < quake_intensity.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(quake_intensity[i] + 1) + '"></i> ' +
            quake_intensity[i] + (quake_intensity[i + 1] ? '&ndash;' + quake_intensity[i + 1] + '<br>' : '+');
        }

      return div;
    };



    legend.addTo(myMap);
}

