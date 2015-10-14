define(['backbone'], function (Backbone)
{

    /*
    This does not work in chrome because it does not like the 127.0.0.1
    or the localhost url root and will throw an error.
    */
    var ItemModel = Backbone.Model.extend(
    {
        //Skipping a backend object model, we'll do the scrubbing here
        //and add from the fetch result, populate attr we care about.
        url: function ()
        {
            return window.location.hostname + ':8080/fetchItemById/' + this.id
        }
    });

    return ItemModel;

});
