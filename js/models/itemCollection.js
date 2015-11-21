define(['backbone', 'models/itemModel'], function (Backbone, ItemModel)
{

    var ItemCollection = Backbone.Collection.extend(
    {
        model: ItemModel,
        url: 'http://' + window.location.hostname + '/fetchAllItems'
    });

    return ItemCollection;

});
