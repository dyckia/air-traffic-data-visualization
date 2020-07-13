function readCSVFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var content;
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                content = rawFile.responseText;
            }
        }
    }
    rawFile.send();
    return content;
}

function initMap() {
    // initialize the map
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.715736, lng: -117.161087 },
        zoom: 2
    });

    // load airport locations from csv file
    var content = readCSVFile("./airports_intl.csv");
    // airports is an array of airports [code, lat, lng]
    var airports = d3.csvParseRows(content);
    
    var airportIcon = "./airport-icon.png";

    // display airports on the map
    var markers = airports.map((airport, i) => new google.maps.Marker({
        position: { lat: parseFloat(airport[1]), lng: parseFloat(airport[2]) },
        label: airport[0]
    }));
    
    var markerCluster = new MarkerClusterer(map, markers, 
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    JFK = { lat: 40.63980103, lng: -73.77890015 };
    LAX = { lat: 33.94250107, lng: -118.4079971 };
    SEA = { lat: 47.44900131, lng: -122.3089981 };
    MIA = { lat: 25.79319954, lng: -80.29060364 };
    MSP = { lat: 44.88199997, lng: -93.22180176 };
    LAS = { lat: 36.08010101, lng: -115.1520004 };
    DWT = { lat: 42.21239853, lng: -83.35340118 };
    IAH = { lat: 29.9843998, lng: -95.34140015 };
    PDX = { lat: 45.58869934, lng: -122.5979996 };

    var paths = [
        [[JFK, LAX], 14, '#fc0303'],
        [[SEA, LAS], 8, '#fc8803'],
        [[MSP, IAH], 3, '#03cafc'],
        [[JFK, MIA], 6, '#67fc03'],
        [[DWT, PDX], 5, '03fce3'],
    ];

    for (path of paths) {
        var line = new google.maps.Polyline({
            path: path[0],
            geodesic: true,
            strokeColor: '#10bbe6',
            strokeOpacity: path[1] / 14,
            strokeWeight: 5
        });

        line.setMap(map);
    }
}
