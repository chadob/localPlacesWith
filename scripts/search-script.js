$('.map-search-select').on('change', function() {
  var prop = $('.map-search-select').val();
  if(!(prop === "Search by?")) {
    var query = $('#mapSearch').val();
    mapSearchFunctions.search(mapSearchFunctions.checkQuery, query, allMarkers, currentMarkers, hiddenMarkers, prop);
  }
  console.log(query);
  console.log(prop);
});

var mapSearchFunctions = {
  search(filterFunction, filterQuery, allMarkers, currentMarkers, hiddenMarkers, prop) {
    mapFunctions.filterAllMarkersAndListItems(mapSearchFunctions.checkQuery, allMarkers, currentMarkers, hiddenMarkers)
  },
  checkQuery(query, prop) {
    return function(idx) {
      return idx.location[prop] === query;
    }
  }
}
