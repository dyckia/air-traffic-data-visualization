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
    const content = readCSVFile(`./data/${filename}`);
    // split on lines
    const rows = content.split(/\n/);
    // construct the aiports object
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
    // console.log(airports);
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
    const content = readCSVFile(`./data/${filename}`);
    // split lines by "\n"\
    // split each line by ","
    // convert passenger to number
    // remove traffic whose passenger count is 0
    const paths = content
        .split(/\n/)
        .map(row => row.split(/,/))
        .filter(row => row[1] != 0);
    console.log(paths);
    return paths;
}

// return maps styles
function getStyles() {
    return [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#242f3e"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#263c3f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6b9a76"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#38414e"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#212a37"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9ca5b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#746855"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#1f2835"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f3d19c"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#2f3948"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d59563"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#515c6d"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#17263c"
                }
            ]
        }
    ]
}

function initMap() {
    const styles = getStyles();

    // initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.715736, lng: -117.161087 },
        zoom: 2,
        styles: styles
    });

    const airports = getAirports("airports-intl.csv");
    // const airports = getAirports("dummy-airports.csv");
    // custom airport icon
    const airportIcon = "./red-dot.png";

    // display airports on the map
    for (const property in airports) {
        const marker = new google.maps.Marker({
            position: airports[property].geo,
            icon: airportIcon,
            map: map
        });
        marker.addListener('mouseover', function() {
            console.log("haha")
        })
    }

    // display marker clusters
    // const markers = []
    // for (const property in airports) {
    //     const marker = new google.maps.Marker({
    //         position: airports[property].geo,
    //         label: airports[property].code
    //     });
    //     markers.push(marker);
    // }
    
    // const markerCluster = new MarkerClusterer(map, markers, 
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
    
    const paths = getPaths("traffics-us.csv");
    for (path of paths) {
        if (typeof airports[path[0]] == 'undefined') console.log(path[0]);
        if (typeof airports[path[1]] == 'undefined') console.log(path[1]);
        const endPoints = [airports[path[0]].geo, airports[path[1]].geo];
        const line = new google.maps.Polyline({
            path: endPoints,
            geodesic: true,
            strokeColor: '#78c2b7',
            strokeOpacity: parseInt(path[2]) / 49658,
            strokeWeight: 0.8
        });
        line.setMap(map);
    }
}
