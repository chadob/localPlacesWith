var listFunctions = {
  hideListItem: function(id) {
    $('.' + id).hide();
  },
  showListItem: function(id) {
    $('.' + id).show();
  },
  createListItem: function(item) {
    var adjustedItem = item.substr(0, 12) + '' + item.substr(12);
    $('.list-container').append(adjustedItem);
  }
}
