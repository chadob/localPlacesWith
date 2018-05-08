$('.map-nav-item').on('click', function(e) {
  var catArray = [];
  var cat;
  e.preventDefault();
  $(this).toggleClass('active');
  $('#mapNav').find('.active').each(function() {
    cat = $(this).children('span').html();
    cat = cat.charAt(0).toLowerCase() + cat.substr(1)
    cat = cat.replace(/\s+/g, '');
    catArray.push(cat);
  });
  if ($(this).hasClass('active')) {
    mapFunctions.filterAllMarkersAndListItems(mapFunctions.everyFunction, catArray, mapFunctions.allMarkers, mapFunctions.currentMarkers, mapFunctions.hiddenMarkers);
    $(this).css('color', '#fff');
  } else {
    mapFunctions.filterAllMarkersAndListItems(mapFunctions.everyFunction, catArray, mapFunctions.allMarkers, mapFunctions.currentMarkers, mapFunctions.hiddenMarkers);
    $(this).css('color', 'rgba(255,255,255,.5)');
  }
});
$('#searchButton').on('click', function() {
    var query = $('#mapSearch').val();
    if (query === "") {
      mapFunctions.showAllMarkersAndListItems(mapFunctions.currentMarkers, mapFunctions.hiddenMarkers, mapFunctions.allMarkers);
      $('.map-nav-item').removeClass('active').css('color', 'rgba(255,255,255,.5)');
    } else {
      console.log(mapFunctions.currentMarkers);
      mapSearchFunctions.search(mapSearchFunctions.checkQuery, mapSearchFunctions.searchProps, mapFunctions.allMarkers, mapFUnctions.currentMarkers, mapFunctions.hiddenMarkers, query);
      console.log(mapFunctions.currentMarkers);
      if (mapFunctions.currentMarkers.length > 0) {
        $('.map-nav-item').removeClass('active').css('color', 'rgba(255,255,255,.5)');
        mapFunctions.panToMarker(mapFunctions.currentMarkers[0]);
      } else {
        $('#failedSearch').show();
        setTimeout(function() {
          $('#failedSearch').hide();
        }, 2000);
      }
    }
});

$('.list-container').scroll(function () {
    if (!listFunctions.timeout) {
        listFunctions.timeout = setTimeout(function () {
            clearTimeout(listFunctions.timeout);
            listFunctions.timeout = null;
            listFunctions.loadMoreList();
        }, 1000);
    }
});
