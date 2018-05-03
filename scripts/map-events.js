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
  console.log(catArray);
  if ($(this).hasClass('active')) {
    mapFunctions.filterAllMarkers(catArray, allMarkers, currentMarkers, hiddenMarkers);
    $(this).css('color', '#fff');
  } else {
    mapFunctions.filterAllMarkers(catArray, allMarkers, currentMarkers, hiddenMarkers);
    $(this).css('color', 'rgba(255,255,255,.5)');
  }
});
