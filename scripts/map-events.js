$('.map-nav-item').on('click', function(e) {
  e.preventDefault();
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    mapFunctions.sortBy();
    $(this).css('color', '#fff');
  } else {
    $(this).css('color', 'rgba(255,255,255,.5)');
  }
});
