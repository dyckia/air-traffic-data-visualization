// read given csv file
function readCSVFile(file) {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    let content;
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

// return a json object of airports
function getAirports(filename) {
    const content = readCSVFile(`./${filename}`);
    // split on lines
    const rows = content.split(/\n/);
    // construct the aiports object
    /*
        {
        JFK: {
            code: JFK,
            geo: { lat: 40.63980103, lng: -73.77890015 }
        },
        LAX: {
            ...
        }
    */
    const airports = rows.reduce((obj, line) => {
        // split on commas
        const parts = line.split(/,/);
        obj[parts[0].trim()] = {
            code: parts[0].trim(),
            geo: {
                lat: +parts[1],
                lng: +parts[2],
            }
        };
        return obj;
    }, {});

    return airports;
}

// return an array of paths
function getPaths(filename) {
    /*
    paths = [
        ["JFK", "LAX", 14],
        ["SEA", "LAS", 8]
    ];
    */
    const content = readCSVFile(`./${filename}`);
    
}

function initMap() {
    // initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.715736, lng: -117.161087 },
        zoom: 2
    });

    const airports = getAirports("dummy-airports.csv");
    
    // set custom airport icon
    // const airportIcon = "./airport-icon.png";

    // display airports on the map
    const markers = []
    for (const property in airports) {
        const marker = new google.maps.Marker({
            position: airports[property].geo,
            label: airports[property].code
        });
        markers.push(marker);
    }

    // const markers = airports.map((airport, i) => new google.maps.Marker({
    //     position: { lat: parseFloat(airport[1]), lng: parseFloat(airport[2]) },
    //     label: airport[0]
    // }));
    
    const markerCluster = new MarkerClusterer(map, markers, 
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    const paths = [
        ["JFK", "LAX", 14],
        ["SEA", "LAS", 8],
        ["MSP", "IAH", 3],
        ["JFK", "MIA", 6],
        ["DWT", "PDX", 5],
    ];

    for (path of paths) {
        const endPoints = [airports[path[0]].geo, airports[path[1]].geo];
        const line = new google.maps.Polyline({
            path: endPoints,
            geodesic: true,
            strokeColor: '#10bbe6',
            strokeOpacity: path[2] / 14,
            strokeWeight: 5
        });

        line.setMap(map);
    }
}
