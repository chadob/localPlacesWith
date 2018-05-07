var listFunctions = {
  shownListItems: [],
  hiddenListItems: [],
  currentListItems: [],
  filteredListItems: [],
  allListItems: [],
  //all and current list items get generated from map-script.js createMarker function
  hideListItem: function(id) {
    $('.' + id).hide();
  },
  showListItem: function(id) {
    $('.' + id).show();
  },
  createListItem: function(item) {
    var adjustedItem = item.substr(0, 12) + '' + item.substr(12);
    $('.list-container').append(adjustedItem);
  },
  emptyList() {
    $('.list-container').empty();
  },
  generateList() {
    this.shownListItems = [];
    this.hiddenListItems = [];
    console.log(this.currentListItems);
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
      this.createListItem(this.hiddenListItems[i].card);
      this.shownListItems.push(this.hiddenListItems[i]);
    }
    this.hiddenListItems.splice(0,20);
  }
}
