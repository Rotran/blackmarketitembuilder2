$(function () {
    $.widget("blackmarket.itemTooltip", {
        options: {
            itemId: undefined,
            divId : undefined
        },
        _create: function () {
            var allItems = $("#item-result").itemResults("option", "allItems");
            //go and find the item to get all of its details.
            var itemTooltip = this;
            var itemIndex = _.findIndex(allItems, function (item) {
                if (item.id == itemTooltip.options.itemId) {
                    return true;
                } else {
                    return false;
                }
            });
            var currentItem = allItems[itemIndex];
            this._createTooltip(currentItem);
        },
        _createTooltip: function (currentItem) {
            var description = currentItem.attributes.description;
            var id = this.options.itemId;
            console.log("create tooltimp");
            console.log(this.options.divId);
            $(this.options.divId).tooltip({
                items: this.options.divId,
                content: description,
                position : { my: "left+15 center", at: "right center", collision : "flip" }
            });
        }
    });
});
