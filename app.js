function readCSVFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var content;
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) 
            {
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
    var content = readCSVFile("./airports_us.csv");
    // airports is an array of airports [code, lat, lng]
    var airports = d3.csvParseRows(content);
    
    var airportIcon = "./airport-icon.png";

    // display airports on the map
    for (airport of airports) {
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(airport[1]), lng: parseFloat(airport[2]) },
            map: map,
            title: airport[0],
            icon: airportIcon
        });
    }
}