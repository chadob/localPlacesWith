$(document).ready(function(){
  var sectionsArray = ["bar-sports", "live-entertainment", "games"];
  $('.add-button').click(function() {
    $('.add-form').toggle();
    $('.update-form').toggle();
  });
  $('.update-button').click(function() {
    $('.update-form').toggle();
    $('.add-form').toggle();
  });
  $('#update-venue-name').blur(function(e) {

  });
  // to prevent unwanted behavior with the trivia checkbox which was displaying on when true and nothing when false
  $('.type:checked').click(function(e) {
      if ($(this).is(":checked")) {
        $(this).attr('value', 'true');
      } else {
        $(this).attr('value', 'false');
      }
  });
  //toggles display of form children when a submission type is chosen, and adds required to the type section
  function changeRequired(sect) {
    $("#" + sectionsArray[sect]).click(function() {
      $('.' + sectionsArray[sect]).toggle(this.checked);
      if ($(this).is(":checked")) {
        $('.category-checkbox').removeAttr('required');
        $('.' + sectionsArray[sect]).find('.type').attr("required", "required");
        //Event for removing / adding required attribute to the types of sections
        $('.' + sectionsArray[sect]).find('.type:checkbox').click(function() {
          if ($(this).is(':checked')) {
            $('.' + sectionsArray[sect]).find('.type').removeAttr('required');
          } else if ($('.' + sectionsArray[sect]).find('.type').is('checked') || ($('.' + sectionsArray[sect]).find('.type:text').val() !== undefined && $('.' + sectionsArray[sect]).find('.type:text').val() !== "")) {
          } else {
            $('.' + sectionsArray[sect]).find('.type').attr('required', 'required');
          }
        });
        // check if things are checked or if text input has chars in it
        $('.' + sectionsArray[sect]).find('.type:text').on('blur', function() {
          if ($('.' + sectionsArray[sect]).find('.type:checkbox').is('checked') || ($('.' + sectionsArray[sect]).find('.type:text').val() !== undefined && $('.' + sectionsArray[sect]).find('.type:text').val() !== "")) {
            console.log('blurred');
            $('.' + sectionsArray[sect]).find('.type').removeAttr('required');
          } else {
            console.log($('.' + sectionsArray[sect]).find('.type:checkbox').attr('name'));
            console.log($('.' + sectionsArray[sect]).find('.type:checkbox').is('checked'));
            $('.' + sectionsArray[sect]).find('.type').attr('required', 'required');
          }
        });
      } else if ($('.category-checkbox').is(':checked')){
      } else {
        $('.category-checkbox').attr('required', 'required');
        $('.' + sectionsArray[sect]).find('.type').removeAttr("required");
      }
    });
  }
  function toggleDisplay(sect) {
    $('.' + sectionsArray[sect]).find('.type').click(function() {
      var name = $(this).attr('name').toLowerCase().replace(" ", "-");
      $('.' + name).toggle();
    });
  }
  for (sect = 0; sect < sectionsArray.length; sect++) {
    changeRequired(sect);
    toggleDisplay(sect);
  }

});
