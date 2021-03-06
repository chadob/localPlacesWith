getColorObject = {
  getColor: function(data, loc, numSections, category, sectionsObject) {
    for(var i = numSections - 1; i > -1; i--) {
      if(data[loc]["venueName"] === "Vidiot Arcade Bar") {
      }
      if (data[loc][sectionsObject[category][i]]) {
        return "" + i;
      }
    }
  },

  loopOverObject: function(object) {
    var sectionsObject = {
      "Bar Sports": ["pool", "pingPong", "darts", "cornhole", "foosball", "shuffleboard", "barSportsOther"],
      "Live Entertainment": ["liveMusic", "karaoke", "dancing", "piano", "openMic", "comedy", "liveEntertainmentOther"],
      "Games": ["skeeball", "jenga", "trivia", "boardGames", "videoGames", "arcades", "gamesOther"]
    };
    for (var loc in object) {
      for (var category in sectionsObject) {
        var numSections = sectionsObject[category].length;
        var adjustedCat = category.replace(/([A-Z])/g, '$1').trim();
        adjustedCat = adjustedCat.charAt(0).toLowerCase() + adjustedCat.substr(1);
        adjustedCat = adjustedCat.replace(/\s+/g, '');
        object[loc][adjustedCat + "Color"] = this.getColor(object, loc, numSections, category, sectionsObject);
      }
    }
    this.postData(object);
  },

  postData: function(data) {
    console.log(data);
    //posts to all data spreadsheet
    var url = "https://script.google.com/macros/s/AKfycbx2S3un49m6cAUQML80HgTNGIT1_Mu-bmyhi_l0U788ED_jUdk/exec";  //
  }
}
//call the loop
getColorObject.loopOverObject(allData);
