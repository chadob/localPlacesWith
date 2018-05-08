var mapSearchFunctions = {

  searchProps: ["zip", "state", "city"],

  search(filterFunction, categories, allMarkers, currentMarkers, hiddenMarkers, query) {
    mapFunctions.filterAllMarkersAndListItems(mapSearchFunctions.checkQuery, categories, allMarkers, currentMarkers, hiddenMarkers, query)
  },

  checkQuery(categoryArray, query) {
    return function(idx) {
      return categoryArray.some(function(cat) {
        return query.toString().toLowerCase() === idx.location[cat].toString().toLowerCase();
      });
    }
  }
}
