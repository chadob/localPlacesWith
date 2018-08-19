var mapSearchFunctions = {
  searchEvent: function() {
    var query = $('#mapSearch').val();
    if (query === "") {
      mapFunctions.showAllMarkersAndListItems();
      $('.map-nav-item').removeClass('active').css('color', 'rgba(255,255,255,.5)');
    } else {
      mapFunctions.filterAllMarkersAndListItems()
      if (mapFunctions.currentMarkers.length > 0) {
        $('.map-nav-item').removeClass('active').css('color', 'rgba(255,255,255,.5)');
        mapFunctions.panToMarker(mapFunctions.currentMarkers[0]);
      } else {
        $('.map-nav-item').removeClass('active').css('color', 'rgba(255,255,255,.5)');
        $('#failedSearch').show();
        setTimeout(function() {
          $('#failedSearch').hide();
          mapFunctions.showAllMarkersAndListItems();
          mapFunctions.closeAllInfoWindows();
          mapFunctions.zoomOut();
        }, 3000);
      }
    }
  },
  checkQuery: function(categoryArray, query) {
    return function(idx) {
      return categoryArray.some(function(cat) {
        return query.toString().toLowerCase() === idx.location[cat].toString().toLowerCase();
      });
    }
  }
}
