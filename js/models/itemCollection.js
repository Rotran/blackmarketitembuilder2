define(['backbone', 'models/itemModel'],function(Backbone, ItemModel){

var ItemCollection = Backbone.Collection.extend({
    model : ItemModel,
    url : 'http://blackmarket.rotran.io:8080/fetchAllItems'
});

return ItemCollection;

});
