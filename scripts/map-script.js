var apiKey="AIzaSyB8PHeruSgg5rBwwML2IWYO6DsSsaU5na0";
var organizedData;
var map;
var geocoder;
var infoWindows = [];
var currentMarkers = [];
var hiddenMarkers = [];
var allMarkers = [];
Array.prototype.partition = function (f, trueArray, falseArray) {
  var matched = [],
      unmatched = [],
      i = 0,
      j = this.length;

  for (; i < j; i++){
    (f.call(this, this[i], i) ? matched : unmatched).push(this[i]);
  }
  return [matched, unmatched];
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45, lng: -110},
    zoom: 3
  });
  map.addListener('click', function(event) {
    mapFunctions.closeAllInfoWindows();
    infoWindows = [];
  });
  for (i = 0; i < barSportsData.length; i++) {
    mapFunctions.createMarkerAndListItem(barSportsData[i], "Bar Sports", i);
  }
}

var mapFunctions = {
  everyFunction(categoryArray){
    return function(idx) {
      return categoryArray.every(function(cat) {
        return cat in idx.location;
      });
    }
  },
  //function for finding an instance of a character in a string
  nthIndex: function(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
  },
  showAllMarkersAndListItems: function(curArray, hidArray, allArray) {
    var endOfString;
    curArray = allArray;
    hidArray = [];
    for (var i = 0; i < allArray.length; i++) {
      allArray[i].setMap(map);
      endOfString = mapFunctions.nthIndex(curArray[i].card, '"', 2);
      listFunctions.showListItem(allArray[i].card.slice(allArray[i].card.indexOf("id"), endOfString));
    }
  },
  //searches categories selected against all markers
  filterAllMarkersAndListItems: function(filterFunction, categories, allArray, curArray, hidArray, query) {
    var joinedArr = allArray.partition(filterFunction(categories, query), curArray, hidArray);
    curArray = joinedArr[0];
    hidArray = joinedArr[1];
    var endOfString;
    for (var i=0;i<curArray.length;i++) {
      curArray[i].setMap(map);
      endOfString = mapFunctions.nthIndex(curArray[i].card, '"', 2);
      listFunctions.showListItem(curArray[i].card.slice(curArray[i].card.indexOf("id"), endOfString));
    }
    for (var i=0;i<hidArray.length;i++) {
      hidArray[i].setMap(null);
      endOfString = mapFunctions.nthIndex(hidArray[i].card, '"', 2);
      listFunctions.hideListItem(hidArray[i].card.slice(hidArray[i].card.indexOf("id"), endOfString));
    }
  },
  //hides all cards when clicking on map
  closeAllInfoWindows: function() {
    for (var i=0;i<infoWindows.length;i++) {
       infoWindows[i].close();
    }
  },
  //Create marker based on the data in location
  createMarkerAndListItem: function(location, section, id) {
    var locArr = location.coords.split(',');
    var lat = Number(locArr[0]);
    var lng = Number(locArr[1]);
    var img = this.colorMarker(location, section)
    var card = this.setUpCard(location, section, id);
    var infoWindow = new google.maps.InfoWindow({
      content: card,
      maxHeight: 500
    });
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      title:location["Venue Name"],
      location: location,
      card: card
      // icon: img
    });
    marker.addListener('click', function() {
      mapFunctions.closeAllInfoWindows();
      infoWindows = [];
      infoWindows.push(infoWindow);
      infoWindow.open(map, marker);
    });
    allMarkers.push(marker);
    currentMarkers.push(marker);
    marker.setMap(map);
    //function located in list-script.js
    listFunctions.createListItem(marker.card);
  },
  //chooses what color markers should have
  colorMarker(location, section) {
    var img = '';
    var numSections = this.sectionsObject[section].length;
    for(var i = this.sectionsObject[section].length - 1; i > 0; i--) {
      if (location[this.sectionsObject[section][i]]) {
        img = './images/marker' + i + '.png';
        return img;
      }
    }
  },
  //creates the text on the cards
  setUpCard(location, section, id) {
    var adjusted;
    var basicProps = "";
    // fix this
    var adjustedSection = section.replace(/([A-Z])/g, '$1').trim();
    adjustedSection = adjustedSection.charAt(0).toLowerCase() + adjustedSection.substr(1);
    adjustedSection = adjustedSection.replace(/\s+/g, '');
    var checkAgainstCategories = ["dateSubmitted","name","coords","venueName","streetAddress","city","state","zip", adjustedSection + "Other", adjustedSection + "Plus"];
    for (var prop in location) {
      if (checkAgainstCategories.indexOf(prop) < 0) {
        adjusted = prop.replace(/([A-Z])/g, ' $1').trim();
        adjusted = adjusted.charAt(0).toUpperCase() + adjusted.substr(1);
        basicProps = basicProps.concat('<p> <span class="card-cat">' + adjusted + ': </span>' + location[prop] + '</p>')
      }
    }
    if (location[adjustedSection + "Other"]) {
      var other = '<p> <span class="card-cat"> Other ' + section + ': </span>' + location[adjustedSection + "Other"] + '</p>';
    } else {
      var other = "";
    }
    if (location[adjustedSection + "Plus"]) {
      var plus = '<p> <span class="card-cat"> Other Amenities: </span>' + location[adjustedSection + "Plus"] + '</p>';
    } else {
      var plus = "";
    }
    var content =
    '<div class="card id' + id + '">' +
    '<h5>' + location.venueName + '</h5>' +
    '<p><a href="https://maps.google.com/?q=1200' + location.streetAddress + ' ' + location.city + ', ' + location.state + ' ' + location.zip  + '">' + location.streetAddress + ' ' + location.city + ', ' + location.state + ' ' + location.zip + '</a></p>' +
    basicProps +
    other +
    plus +
    '<div>';
    return content;
  },
  //create object that has locations sorted by categories they have
  sectionsObject: {
    "Bar Sports": ["pool", "pingPong", "darts", "cornhole", "foosball", "shuffleboard", "barSportsOther"],
    "Live Entertainment": ["liveMusic", "karaoke", "dancing", "piano", "openMic", "comedy", "liveEntertainmentOther"],
    "Games": ["skeeball", "jenga", "trivia", "boardGames", "videoGames", "arcades", "gamesOther"]
  }
}
