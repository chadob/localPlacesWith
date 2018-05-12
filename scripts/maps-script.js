var apiKey="AIzaSyB8PHeruSgg5rBwwML2IWYO6DsSsaU5na0";
var map;
var page;
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
  page = "Bar Sports";
  map.addListener('click', function(event) {
    mapFunctions.closeAllInfoWindows();
    mapFunctions.infoWindows = [];
    if (mapFunctions.currentMarker) {
      mapFunctions.shrinkMarker(mapFunctions.currentMarker);
    }
  });
  mapFunctions.createAllMarkers(barSportsData, page);
  listFunctions.generateList();
}

var mapFunctions = {
  infoWindows: [],
  currentMarkers: [],
  hiddenMarkers: [],
  allMarkers: [],
  currentMarker: null,
  createAllMarkers(data, page) {
    this.adjustCurrentSection(page);
    var numSections = this.sectionsObject[page].length;
    for (i = 0; i < data.length; i++) {
      mapFunctions.createMarker(data[i], page, i, numSections);
    }
  },
  //create object that has locations sorted by categories they have


  adjustedSection: "",
  //replace sectionsObject lines with this if you want other again
  // "Bar Sports": ["pool", "pingPong", "darts", "cornhole", "foosball", "shuffleboard", "barSportsOther"],
  // "Live Entertainment": ["liveMusic", "karaoke", "dancing", "piano", "openMic", "comedy", "liveEntertainmentOther"],
  // "Games": ["skeeball", "jenga", "trivia", "boardGames", "videoGames", "arcades", "gamesOther"]
  sectionsObject: {
    "Bar Sports": ["pool", "pingPong", "darts", "cornhole", "foosball", "shuffleboard"],
    "Live Entertainment": ["liveMusic", "karaoke", "dancing", "piano", "openMic", "comedy"],
    "Games": ["skeeball", "jenga", "trivia", "boardGames", "videoGames", "arcades"]
  },
  adjustCurrentSection(section) {
    var adjustedCurrentSection =  section.replace(/([A-Z])/g, '$1').trim();
    adjustedCurrentSection = adjustedCurrentSection.charAt(0).toLowerCase() + adjustedCurrentSection.substr(1);
    adjustedCurrentSection = adjustedCurrentSection.replace(/\s+/g, '');
    this.adjustedSection = adjustedCurrentSection;
  },
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

  showAllMarkersAndListItems: function() {
    var endOfString;
    mapFunctions.currentMarkers = mapFunctions.allMarkers;
    mapFunctions.hiddenMarkers = [];
    for (var i = 0; i < mapFunctions.allMarkers.length; i++) {
      mapFunctions.allMarkers[i].icon = {
        url: './images/marker' + mapFunctions.allMarkers[i].color + '.png',
      }
      mapFunctions.allMarkers[i].setMap(map);
    }
    listFunctions.emptyList();
    listFunctions.generateList();
  },

  //searches categories selected against all markers
  filterAllMarkersAndListItems: function(filterFunction, categories, query, color) {
    var joinedArr = mapFunctions.allMarkers.partition(filterFunction(categories, query));
    mapFunctions.currentMarkers = joinedArr[0];
    listFunctions.currentListItems = mapFunctions.currentMarkers;
    mapFunctions.hiddenMarkers = joinedArr[1];
    listFunctions.filteredListItems = mapFunctions.hiddenMarkers;
    var endOfString;
    //hide/show markers
    for (var i=0;i<mapFunctions.currentMarkers.length;i++) {
      if (typeof color === "number") {
        mapFunctions.currentMarkers[i].icon = {
          url: './images/marker' + color + '.png',
        }
        mapFunctions.currentMarkers[i].setMap(map);
      } else {
        mapFunctions.currentMarkers[i].icon = {
          url: './images/marker' + mapFunctions.currentMarkers[i].color + '.png',
        }
        mapFunctions.currentMarkers[i].setMap(map);

      }
    }
    for (var i=0;i<mapFunctions.hiddenMarkers.length;i++) {
      mapFunctions.hiddenMarkers[i].setMap(null);
    }
    //hide list items/show 20
    listFunctions.emptyList();
    listFunctions.generateList();
  },

  shrinkMarker(marker) {
    marker.icon.url = './images/marker' + marker.icon.url.slice(15, 16) +'.png';
    marker.icon.size= new google.maps.Size(20, 24);
    marker.setZIndex(1000);
    marker.setIcon(marker.icon);
  },

  growMarker(marker) {
    marker.icon.url = marker.icon.url.substr(0, 16) + 'big' + marker.icon.url.substr(16);
    marker.icon.size = new google.maps.Size(30, 36);
    marker.setZIndex(10000000);
    mapFunctions.currentMarker = marker;
    marker.setIcon(marker.icon);
  },

  //pan to first result on searchs
  panToMarker(marker) {
    var coords = marker.location.coords.split(',');
    coords = {
      lat: parseFloat(coords[0]),
      lng: parseFloat(coords[1])
    }
    marker.
    map.panTo(coords);
    map.setZoom(10);
    var infoWindow = new google.maps.InfoWindow({
      content: marker.card,
      maxHeight: 500
    });
    mapFunctions.closeAllInfoWindows();
    mapFunctions.infoWindows = [];
    mapFunctions.infoWindows.push(infoWindow);
    infoWindow.open(map, marker);
    if (mapFunctions.currentMarker) {
      mapFunctions.shrinkMarker(mapFunctions.currentMarker);
    }
    mapFunctions.growMarker(marker);
  },

  //zoom out after failed search
  zoomOut: function() {
    map.panTo({lat: 45, lng: -110});
    map.setZoom(3);
  },

  //hides all cards when clicking on map
  closeAllInfoWindows: function() {
    for (var i=0;i<this.infoWindows.length;i++) {
       this.infoWindows[i].close();
    }
  },
  //Create marker based on the data in location
  createMarker: function(location, section, id, numSections) {
    var locArr = location.coords.split(',');
    var lat = Number(locArr[0]);
    var lng = Number(locArr[1]);
    var img = {
      url: './images/marker' + location[this.adjustedSection + "Color"] + '.png',
    }
    var card = this.setUpCard(location, section, id, this.adjustedSection);
    var infoWindow = new google.maps.InfoWindow({
      content: card,
      maxHeight: 500
    });
    var marker = new google.maps.Marker({
      color: location[this.adjustedSection + "Color"],
      position: {lat: lat, lng: lng},
      title:location["Venue Name"],
      location: location,
      card: card,
      icon: img
    });
    marker.addListener('click', function() {
      mapFunctions.closeAllInfoWindows();
      mapFunctions.infoWindows = [];
      mapFunctions.infoWindows.push(infoWindow);
      infoWindow.open(map, marker);
      if (mapFunctions.currentMarker) {
        mapFunctions.shrinkMarker(mapFunctions.currentMarker);
      }
      mapFunctions.growMarker(marker);
    });
    mapFunctions.allMarkers.push(marker);
    mapFunctions.currentMarkers.push(marker);
    //send markers over to list to generate divs
    listFunctions.allListItems.push(marker);
    listFunctions.currentListItems.push(marker);
    marker.setMap(map);
  },
  //creates the text on the cards
  setUpCard(location, section, id, adjustedSection) {
    var adjusted;
    var basicProps = "";
    var checkAgainstCategories = ["dateSubmitted","name","coords","venueName","streetAddress","city","state","zip", adjustedSection + "Other", adjustedSection + "Color", adjustedSection + "Plus"];
    for (var prop in location) {
      if (checkAgainstCategories.indexOf(prop) < 0) {
        adjusted = prop.replace(/([A-Z])/g, ' $1').trim();
        adjusted = adjusted.charAt(0).toUpperCase() + adjusted.substr(1);
        basicProps = basicProps.concat('<p> <span class="card-cat">' + adjusted + ': </span>' + location[prop] + '</p>')
      }
    }
    if (location[adjustedSection + "Other"]) {
      var other = "";
      // var other = '<p> <span class="card-cat"> Other ' + section + ': </span>' + location[adjustedSection + "Other"] + '</p>';
    } else {
      var other = "";
    }
    if (location[adjustedSection + "Plus"]) {
      var plus = '<p> <span class="card-cat"> Other Amenities: </span>' + location[adjustedSection + "Plus"] + '</p>';
    } else {
      var plus = "";
    }
    var content =
    '<div class="gmap-card id' + id + '">' +
    '<h5>' + location.venueName + '</h5>' +
    '<p><a href="https://maps.google.com/?q=1200' + location.streetAddress + ' ' + location.city + ', ' + location.state + ' ' + location.zip  + '">' + location.streetAddress + ' ' + location.city + ', ' + location.state + ' ' + location.zip + '</a></p>' +
    basicProps +
    other +
    plus +
    '<div>';
    return content;
  }
}
