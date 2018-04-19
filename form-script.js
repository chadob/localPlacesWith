$(document).ready(function(){
  barSportsCats = ["pool", "ping-pong", "darts", "cornhole", "foosball", "shuffleboard"];
  $('.add-button').click(function() {
    $('.add-form').toggle();
    $('.update-form').toggle();
  });
  $('.update-button').click(function() {
    $('.update-form').toggle();
    $('.add-form').toggle();
  });

  $('#bar-sports').click(function() {
      $(".bar-sports").toggle(this.checked);
  });
  $('#live-entertainment').click(function() {
      $(".live-entertainment").toggle(this.checked);
  });
  $('#games').click(function() {
      $(".games").toggle(this.checked);
  });
  $('#update-venue-name').blur(function(e) {

  });
  for (cat = 0; cat < barSportsCats.length; cat++) {
    $("#" + barSportsCats[cat] + "-checkbox").click(function() {
      console.log(cat);
      console.log(barSportsCats);
      console.log("." + barSportsCats[cat] + "-number-tables");
      $("." + barSportsCats[cat] + "-number-tables").toggle(this.checked);
      $("." + barSportsCats[cat] + "-cost").toggle(this.checked);
    });
  }
});
