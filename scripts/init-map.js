function initMap(page, center, zoom, city) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: zoom
  });
  //converts the page to the variable name of the data object
  var data = window[page.substring(0, 1).toLowerCase() + page.substring(1, page.length).replace(/\s/g, '') + 'Data'];
  map.addListener('click', function(event) {
    mapFunctions.closeAllInfoWindows();
    mapFunctions.infoWindows = [];
    if (mapFunctions.currentMarker) {
      mapFunctions.shrinkMarker(mapFunctions.currentMarker);
    }
  });
  mapFunctions.createAllMarkers(data, page);
  city && mapSearchFunctions.searchEvent();
  listFunctions.generateList(city);
}
