getCoordsObject {
  getCoords: function(data, loc, i, totalRuns) {
    console.log('ran');
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': data[loc].streetAddress + ' ' + data[loc].city + ' ' + data[loc].state}, function(results, status) {
      if (status == 'OK') {
        data[loc].coords = results[0].geometry.viewport.f.f + ', ' + results[0].geometry.viewport.b.b;
        if (i === totalRuns) {
          console.log(data);
        }
        // return postData(jsonData);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  },

  doScaledTimeout: function(i, amount, object, prop, func, totalRuns) {
    setTimeout(function() {
      func(object, prop, i, totalRuns);
    }, i * amount);
  },

  loopOverObject: function(amount, object, func) {
    var totalRuns = Object.keys(allData).length;
    var i = 0;
    for (var loc in object) {
      i++;
      doScaledTimeout(i, amount, object, loc, func, totalRuns);
    }
  },

  function postData(data) {
    console.log(data);
    //posts to all data spreadsheet
    var url = "https://script.google.com/macros/s/AKfycbx2S3un49m6cAUQML80HgTNGIT1_Mu-bmyhi_l0U788ED_jUdk/exec";  //
  }
}
//call the loop
// getCoordsObject.loopOverObject(1000, allData, getCoords);
