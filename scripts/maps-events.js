var initialSearchValue;
$(document).ready(function() {
      initialSearchValue = $('#mapSearch').val();
});
$('.map-nav-item').on('click', function(e) {
  var catArray = [];
  var cat;
  var color;
  colorsObject = {
    "Bar Sports": {
      "pool": 0,
      "pingPong": 1,
      "darts": 2,
      "cornhole": 3,
      "foosball": 4,
      "shuffleboard": 5
    },
    "Live Entertainment": {
      "liveMusic": 0,
      "karaoke": 1,
      "dancing": 2,
      "piano": 3,
      "openMic": 4,
      "comedy": 5
    },
    "Games": {
      "skeeball": 0,
      "jenga": 1,
      "trivia": 2,
      "boardGames": 3,
      "videoGames": 4,
      "arcades": 5
    }
  };
  e.preventDefault();
  $(this).toggleClass('active');
  $('#mapNav').find('.active').each(function() {
    cat = $(this).children('span').html();
    cat = cat.charAt(0).toLowerCase() + cat.substr(1)
    cat = cat.replace(/\s+/g, '');
    color = colorsObject[page][cat];
    catArray.push(cat);
  });
  if ($(this).hasClass('active')) {
    if (catArray.length > 1) {
      color = Object.keys(colorsObject[page]).length;
      mapFunctions.filterAllMarkersAndListItems(catArray, color);
      $('#multiSelect').show();
      setTimeout(function() {
        $('#multiSelect').hide();
      }, 5000);
    } else {
      mapFunctions.filterAllMarkersAndListItems(catArray, color);
    }
    $(this).css('color', '#fff');
  } else {
    if ($('#mapNav').children('.active')[0]) {
      mapFunctions.filterAllMarkersAndListItems(catArray, color);
      $(this).css('color', 'rgba(255,255,255,.5)');
    } else {
      mapFunctions.filterAllMarkersAndListItems();
      $(this).css('color', 'rgba(255,255,255,.5)');
    }
  }
});


$('#resetButton').click(function() {
  $('#mapSearch').val('');
  $('#mapNav').find('.active').each(function() {
    $(this).toggleClass('active');
    $(this).css('color', 'rgba(255,255,255,.5)');
  });
  mapFunctions.showAllMarkersAndListItems();
  mapFunctions.closeAllInfoWindows();
  mapFunctions.zoomOut();
});



//overwrites above code on hovering
$('.map-nav-item').on('mouseenter', function() {
  $(this).css('color', '#fff');
}).mouseleave(function() {
  if (!($(this).hasClass('active'))) {
    $(this).css('color', 'rgba(255,255,255,.5)');
  }
});

$('#searchButton').on('click', mapSearchFunctions.searchEvent);

$('#mapSearch').on('keypress', function(e) {
  if(e.which == 13) {
    mapSearchFunctions.searchEvent();
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

$(document).on("click", '.gmap-card-title', function(e) {
  var id = $(this).parent().attr('id');
  var index = id.substring(4, id.length);
  var marker = mapFunctions.allMarkers[index];
  if (mapFunctions.currentMarker) {
    mapFunctions.shrinkMarker(mapFunctions.currentMarker);
  }
  mapFunctions.panToMarker(marker);
});
