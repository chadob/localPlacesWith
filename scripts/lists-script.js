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
  createListItem: function(item) {
    var adjustedItem = item.substr(0, 12) + 'card-list ' + item.substr(12);
    $('.list-container').append(adjustedItem);
  },
  emptyList() {
    $('.list-container').empty();
  },
  generateList() {
    this.shownListItems = [];
    this.hiddenListItems = [];
    for (i=0; i<this.currentListItems.length; i++) {
      if (i<20) {
        this.createListItem(this.currentListItems[i].card);
        this.shownListItems.push(this.currentListItems[i]);
      } else {
        this.hiddenListItems.push(this.currentListItems[i]);
      }
    }
  },
  loadMoreList() {
    for (i=0; i<20; i++) {
      if(this.hiddenListItems[i]) {
        this.createListItem(this.hiddenListItems[i].card);
        this.shownListItems.push(this.hiddenListItems[i]);
      }
    }
    this.hiddenListItems.splice(0,20);
  }
}
