$(function () {
    $.widget("blackMarket.itemResults", {
        options: {
            //Defaults to all items, this should never be changed
            allItems: []
        },
        //creating a filtered set that will be used and manipulated
        _filteredItems: [],
        _create: function () {
            //set filtered items to all items initially.
            this._filteredItems = this.options.allItems;
            this._createList();
        },
        _createList: function () {
            for (var i = 0; i < this._filteredItems.length; i++) {
                this._createDraggableListItem(this._filteredItems[i]);
            }
            if (this._filteredItems.length == 0) {
                $("#item-result-list").append("<div>Sorry, no results found.</div>")
            }
        },
        _createDraggableListItem: function (item) {
            var itemAttr = item.attributes;
            var itemURL = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/item/" + itemAttr.image.full;
            var template = "<li dbid="+item.id+" class=items-tooltip-"+item.id+" id=" + item.id +"-listItem><img id=" + item.id +" class=item-icon src=" + itemURL + "><table class=mini-info><tr><td><div style=max-width:150px;>" + itemAttr.name + "</div></td></tr><tr><td><img class=gold-coins src=images/gold-coins.gif><div>" + itemAttr.gold.total + "</div></td></tr></table></li>";

            $("#item-result-list").append(template);
            $("#" + item.id+"-listItem").draggable({
                helper: "clone"
            });
            var divId = ".items-tooltip-"+item.id
            $(".items-tooltip-"+item.id).itemTooltip({itemId : item.id, divId : divId});
        },
        getCurrentItems: function () {
            return this._filterDisplayItems;
        },
        searchDisplayItems: function (searchText) {
            if (searchText != undefined) {
                //set filtered items to have only what contains the text string
                var searchedItems = _.filter(this.options.allItems, function (item) {
                    var itemAttr = item.attributes;
                    var inTag = false;
                    //We're going to allow searching my popular tags
                    if (itemAttr.tags != undefined) {
                        for (var t = 0; t < itemAttr.tags.length; t++) {
                            //we do a +2 here to cheat and include boot == boots but exclude pretty much
                            // all the other unwanted cases of contaiment i.e: boot != nonBOOTsmovement
                            if (itemAttr.tags[t].toLowerCase().indexOf(searchText.toLowerCase()) > -1 && itemAttr.tags[t].length < searchText.length + 2) {
                                inTag = true;
                                break;
                            }
                        }
                    }
                    //For the search we will return if the name contains the searchString or
                    // if the tag matches the search string exactlyish according to the comment above
                    return (itemAttr.name.toLowerCase().indexOf(searchText) > -1) || inTag;
                });

                this._filteredItems = searchedItems;
                //clear out the current list and populate with the one
                $("#item-result-list").empty();
                this._createList();

            } else {
                //seth the list back to all items and clear out the results and redraw
                this._filteredItems = this.options.allItems;
                $("#item-result-list").empty();
                this._createList();
            }
        },
        filterDisplayItems: function (filterTags) {
            //we will recieve a list of filter Tags and then iterate through all
            //items and see which tags are totally contained

            //set the default to all items
            var filteredItems = this.options.allItems;
            if (filterTags != undefined) {
                filteredItems = _.filter(this.options.allItems, function (item) {
                    var itemAttr = item.attributes;
                    if (itemAttr.tags != undefined && itemAttr.tags.length >= filterTags.length) {
                        var intersection = _.intersection(filterTags, item.attributes.tags);
                        if (intersection.length == filterTags.length) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
            }

            this._filteredItems = filteredItems;
            //empty the current list and redraw it
            $("#item-result-list").empty();
            this._createList();
        }
    });
});
