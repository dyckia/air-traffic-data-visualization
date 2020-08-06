// global variable to store mouse position
const MOUSEPOS = {"x": 0, "y": 0}

// track mouse position
function updateMousePos(event) {
    MOUSEPOS.x = event.clientX;
    MOUSEPOS.y = event.clientY;
}


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
            pos: { lat: 40.63980103, lng: -73.77890015 }
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
            pos: {
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


// TODO fine tune opacity
// return opacity based on traffice amount
function getDomesticOpacity(n) {
    if (n < 100) return 0.125;
    else if (n < 999) return 0.15;
    else if (n < 5000) return 0.175;
    else if (n < 10000) return 0.2;
    else if (n < 20000) return 0.225;
    else if (n < 30000) return 0.25;
    else if (n < 40000) return 0.275;
    else if (n < 50000) return 0.3;
}


function getInternationalOpacity(n) {
    if (n < 1000) return 0.05;
    else if (n < 10000) return 0.1;
    else if (n < 100000) return 0.15;
    else if (n < 1000000) return 0.2;
    else if (n < 3000000) return 0.225;
    else if (n < 4000000) return 0.25;
    else if (n < 5000000) return 0.275;
    else if (n < 8000000) return 0.3;
}


function showTooltip(event, code) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = MOUSEPOS.x + 5 + 'px';
    tooltip.style.top = MOUSEPOS.y + 5 + 'px';
    tooltip.innerHTML = code;
}


function hideTooltip(event) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}


// main function
function initMap() {
    const styles = getStyles();

    // initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.024009, lng: -97.081117 },
        zoom: 4,
        styles: styles
    });

    const airports = getAirports("airports-intl.csv");
    // const airports = getAirports("dummy-airports.csv");
    // custom airport icon
    const airportIcon = "./assets/red-dot.png";

    // display airports on the map
    for (const property in airports) {
        const marker = new google.maps.Marker({
            position: airports[property].pos,
            icon: airportIcon,
            map: map
        });
        marker.addListener('mousemove', showTooltip.bind(null, event, airports[property].code));
        marker.addListener('mouseout', hideTooltip);
    }

    // display marker clusters
    // const markers = []
    // for (const property in airports) {
    //     const marker = new google.maps.Marker({
    //         position: airports[property].pos,
    //         label: airports[property].code
    //     });
    //     markers.push(marker);
    // }
    
    // const markerCluster = new MarkerClusterer(map, markers, 
    //     { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    let paths;
    let getOpacity;

    if (isDomestic) {
        paths = getPaths("traffics-us.csv");
        getOpacity = getDomesticOpacity;
    } else {
        paths = getPaths("traffics-intl.csv");
        getOpacity = getInternationalOpacity;
    }

    for (path of paths) {
        // debug use
        if (typeof airports[path[0]] == 'undefined') console.log(path[0]);
        if (typeof airports[path[1]] == 'undefined') console.log(path[1]);
        const endPoints = [airports[path[0]].pos, airports[path[1]].pos];
        const opacity = getOpacity(path[2]);
        const line = new google.maps.Polyline({
            path: endPoints,
            geodesic: true,
            strokeColor: '#78c2b7',
            strokeOpacity: opacity,
            strokeWeight: 0.575
        });
        line.setMap(map);
    }
}
