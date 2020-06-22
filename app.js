function readCSVFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) 
            {
                var content = rawFile.responseText;
                alert(content);
            }
        }
    }
    rawFile.send();
}

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 1
    });

    readCSVFile("./dummy.csv");
    var csv = "BTI,70.13400268550001,-143.582000732\nLUR,68.87509918,-166.1100006\nPIZ,69.73290253,-163.0050049000000";

    var data = d3.csvParseRows(csv);

    console.log(data[0][0]);

    var BTI = {lat: 70.13400268550001, lng: -143.582000732};

    var marker = new google.maps.Marker({
        position: BTI,
        map: map,
        title: 'BTI'
    });
}