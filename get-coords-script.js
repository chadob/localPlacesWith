function initMap() {
  var data = allData;
  var i = 0;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
  for (var loc in data) {
    setTimeout(function(){
      geocoder.geocode( { 'address': data[loc].streetAddress + ' ' + data[loc].city + ' ' + data[loc].state}, function(results, status) {
        if (status == 'OK') {
          i++;
          console.log(results);
          data[loc].Coords = results[0].geometry.viewport.f.f + ', ' + results[0].geometry.viewport.b.b;
          console.log(data[loc].Coords);
          console.log(results[0].geometry)
          data[loc]["Venue Name"] = data[loc].venueName;
          var jsonData = JSON.stringify(data[loc]);
          console.log(jsonData)
          return postData(jsonData);
        } else {
          i++;
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
      console.log('ran');
    }, 1000);
  }
  console.log(data)
}




function postData(data) {
  console.log(data);
  //posts to all data spreadsheet
  var url = "https://script.google.com/macros/s/AKfycbx2S3un49m6cAUQML80HgTNGIT1_Mu-bmyhi_l0U788ED_jUdk/exec";  //
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  // xhr.withCredentials = true;
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    console.log('sent');
    return;
  };
  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
  }).join('&')
  xhr.send(encoded);
}
