function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 1
    });

    var BTI = {lat: 70.13400268550001, lng: -143.582000732};

    var marker = new google.maps.Marker({
        position: BTI,
        map: map,
        title: 'BTI'
    });
}