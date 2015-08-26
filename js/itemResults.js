$(function () {
    $.widget("blackMarket.itemResults", {
        options: {
            allItems: []
        },
        _create: function () {
            console.log("CREATE");
            this._createList();
        },
        _createList: function () {
            for (var i = 0; i < this.options.allItems.length; i++) {
                this._createDraggableListItem(this.options.allItems[i]);
            }
        },
        _createDraggableListItem: function (item) {
            console.log(item);
            var itemAttr = item.attributes;
            var itemURL = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/" + itemAttr.image.full;
            var template = "<li id="+item.id+"><img src=" + itemURL + ">" + itemAttr.name + "</li>";

            $("#item-result-list").append(template);
            $("#"+item.id).draggable();
        }
    });
});
