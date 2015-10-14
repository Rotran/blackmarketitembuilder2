define(['backbone', 'models/itemModel'], function (Backbone, ItemModel)
{

    var ItemCollection = Backbone.Collection.extend(
    {
        model: ItemModel,
        url: window.location.hostname + ':8080/fetchAllItems'
    });

    return ItemCollection;

});
