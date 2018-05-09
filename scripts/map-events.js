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
    mapFunctions.filterAllMarkersAndListItems(mapFunctions.everyFunction, catArray);
    $(this).css('color', '#fff');
  } else {
    mapFunctions.filterAllMarkersAndListItems(mapFunctions.everyFunction, catArray);
    $(this).css('color', 'rgba(255,255,255,.5)');
  }
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
})

$('.list-container').scroll(function () {
    if (!listFunctions.timeout) {
        listFunctions.timeout = setTimeout(function () {
            clearTimeout(listFunctions.timeout);
            listFunctions.timeout = null;
            listFunctions.loadMoreList();
        }, 1000);
    }
});
