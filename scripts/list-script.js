var listFunctions = {
  shownListItems: [],
  hiddenListItems: [],
  currentListItems: [],
  filteredListItems: [],
  allListItems: [],
  timeout: null,
  //all and current list items get generated from map-script.js createMarker function
  hideListItem: function(id) {
    $('.' + id).hide();
  },
  showListItem: function(id) {
    $('.' + id).show();
  },
  createListItem: function(item, id) {
    var adjustedItem = item.substr(0, 12) + 'card card-list ' + item.substr(22);
    var adjustedItem = adjustedItem.substr(0, 4) + ' id="card'+ id + '" ' + adjustedItem.substr(4);
    $('.list-container').append(adjustedItem);
  },
  emptyList: function() {
    $('.list-container').empty();
  },
  generateList: function(city) {
    this.shownListItems = [];
    this.hiddenListItems = [];
    this.currentListItems = mapFunctions.currentMarkers;
    if (city) {
      for (i=0; i<this.currentListItems.length; i++) {
        this.createListItem(this.currentListItems[i].card, this.currentListItems[i].id);
        this.shownListItems.push(this.currentListItems[i]);
      }
    } else {
      for (i=0; i<this.currentListItems.length; i++) {
        if (i<20) {
          this.createListItem(this.currentListItems[i].card, this.currentListItems[i].id);
          this.shownListItems.push(this.currentListItems[i]);
        } else {
          this.hiddenListItems.push(this.currentListItems[i]);
        }
      }
    }
  },
  loadMoreList: function() {
    for (i=0; i<20; i++) {
      if(this.hiddenListItems[i]) {
        this.createListItem(this.hiddenListItems[i].card);
        this.shownListItems.push(this.hiddenListItems[i]);
      }
    }
    this.hiddenListItems.splice(0,20);
  }
}
