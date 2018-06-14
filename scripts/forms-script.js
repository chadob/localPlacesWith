$(document).ready(function(){
  var currentWidth = $(window).width();
  function checkWidth(init) {
    if (init && $(window).width() < 500) {
      $('.activities').removeClass('form-check-inline');
      $('.activities').find('input').removeClass('ml-3');
      $('.activities').find('label').after('<br>');
      $('.number-tables').removeClass('form-check-inline');
      $('.number-tables').find('input').removeClass('ml-3');
      $('.number-tables').find('label').after('<br>');
      $('.cost').removeClass('form-check-inline');
      $('.cost').find('input').removeClass('ml-3');
      $('.cost').find('label').after('<br>');
    } else if (currentWidth > 500 && $(window).width() < 500) {
      $('.activities').removeClass('form-check-inline');
      $('.activities').find('input').removeClass('ml-3');
      $('.activities').find('label').after('<br>');
      $('.number-tables').removeClass('form-check-inline');
      $('.number-tables').find('input').removeClass('ml-3');
      $('.number-tables').find('label').after('<br>');
      $('.cost').removeClass('form-check-inline');
      $('.cost').find('input').removeClass('ml-3');
      $('.cost').find('label').after('<br>');
    } else {
      if (!init && $(window).width() > 500) {
        $('.activities').addClass('form-check-inline');
        $('.activities').find('input:not(:first)').addClass('ml-3');
        $('.activities').find('br').remove();
        $('.number-tables').addClass('form-check-inline');
        $('.number-tables').find('input:not(:first)').addClass('ml-3');
        $('.number-tables').find('br').remove();
        $('.cost').addClass('form-check-inline');
        $('.cost').find('input:not(:first)').addClass('ml-3');
        $('.cost').find('br').remove();
      }
    }
    currentWidth = $(window).width();
  }

  checkWidth(true);
  $(window).resize(function() {
    checkWidth(false);
  });
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
          } else if ($('.' + sectionsArray[sect]).find('.type:checkbox:checked').length > 0 || ($('.' + sectionsArray[sect]).find('.type:text').val() !== undefined && $('.' + sectionsArray[sect]).find('.type:text').val() !== "")) {
          } else {
            $('.' + sectionsArray[sect]).find('.type').attr('required', 'required');
          }
        });
        // check if things are checked or if text input has chars in it
        $('.' + sectionsArray[sect]).find('.type:text').on('blur', function() {
          if ($('.' + sectionsArray[sect]).find('.type:checkbox:checked').length > 0 || ($('.' + sectionsArray[sect]).find('.type:text').val() !== undefined && $('.' + sectionsArray[sect]).find('.type:text').val() !== "")) {
            $('.' + sectionsArray[sect]).find('.type').removeAttr('required');
          } else {
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

  //check the users location's coordinates against existing locations to check for duplicates
  function checkDuplicates () {
    if ($('#venueAddress').val().length > 0 && $('#venueCity').val().length > 0 && $('#venueState').val().length > 0) {
      if ($('#formSelector').val() === "Update") {
      } else {
        var geocoder = new google.maps.Geocoder();
        var query = {'address': $('#venueAddress').val() + ' ' + $('#venueCity').val() + ' ' + $('#venueState').val()}
        geocoder.geocode(query, function(results, status) {
          if (status == 'OK') {
            var coords = results[0].geometry.viewport.f.f + ', ' + results[0].geometry.viewport.b.b;
            for (var loc in allData) {
              if (allData[loc].coords === coords) {
                var alreadyExists = $('#alreadyExists');
                if (alreadyExists) {
                  alreadyExists.css("display", "block");
                }
                return false;
              }
            }
            var alreadyExists = $('#alreadyExists');
            if (alreadyExists) {
              alreadyExists.css("display", "none");
            }
            $('#venueCoords').val(coords);
          }
        });
      }
    }
  }
  $('#venueAddress, #venueCity, #venueState').on('blur', function() {
    checkDuplicates();
  });
  $('#formSelector').on('change', function () {
    checkDuplicates();
  });
});
