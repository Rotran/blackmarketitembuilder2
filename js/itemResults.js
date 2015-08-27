$(function () {
    $.widget("blackMarket.itemResults", {
        options: {
            //Defaults to all items, this should never be changed
            allItems: []
        },
        //creating a filtered set that will be used and manipulated
        _filteredItems: [],
        _create: function () {
            console.log("CREATE");
            //set filtered items to all items initially.
            this._filteredItems = this.options.allItems;
            this._createList();
        },
        _createList: function () {
            for (var i = 0; i < this._filteredItems.length; i++) {
                this._createDraggableListItem(this._filteredItems[i]);
            }
        },
        _createDraggableListItem: function (item) {
            console.log(item);
            var itemAttr = item.attributes;
            var itemURL = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/" + itemAttr.image.full;
            var template = "<li id=" + item.id + "><img class=item-icon src=" + itemURL + ">" + itemAttr.name + "</li>";

            $("#item-result-list").append(template);
            $("#" + item.id).draggable({
                helper: "clone"
            });
        },
        getCurrentItems: function () {
            return this._filterDisplayItems;
        },
        filterDisplayItems: function (searchText) {
            if (searchText != undefined) {
                //set filtered items to have only what contains the text string
                var filteredItems = _.filter(this.options.allItems, function (item) {
                    var itemAttr = item.attributes;
                    var inTag = false;
                    if(itemAttr.tags != undefined){
                        for(var t = 0; t < itemAttr.tags.length; t++){
                            if(itemAttr.tags[t].toLowerCase().indexOf(searchText.toLowerCase()) > -1 && itemAttr.tags[t].length < searchText.length +1 ){
                                inTag = true;
                                console.log(itemAttr.name+" found it tag:" + itemAttr.tags[t].toLowerCase());
                                break;
                            }else{
                                console.log(itemAttr.tags[t].toLowerCase());
                            }
                        }
                    }
                    return (itemAttr.name.toLowerCase().indexOf(searchText) > -1) || inTag;
                });

                this._filteredItems = filteredItems;
                //clear out the current list and populate with the one
                $("#item-result-list").empty();
                this._createList();

            } else {
                //seth the list back to all items and clear out the results and redraw
                this._filteredItems = this.options.allItems;
                $("#item-result-list").empty();
                this._createList();
            }
        }
    });
});
