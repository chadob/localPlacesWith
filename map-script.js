var apiKey="AIzaSyB8PHeruSgg5rBwwML2IWYO6DsSsaU5na0";
var map;
var geocoder;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45, lng: -110},
    zoom: 3
  });
  for (var i = 0; i < locations.length; i++) {
    var coords = locations[i].coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
function sortBy(category, data) {
  return data.map(function(idx) {
    idx[category] === "true";
  });
}
