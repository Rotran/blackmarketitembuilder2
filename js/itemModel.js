/*
This does not work in chrome because it does not like the 127.0.0.1
or the localhost url root and will throw an error.
*/
var ItemModel = Backbone.Model.extend({
    //Skipping a backend object model, we'll do the scrubbing here
    //and add from the fetch result, populate attr we care about.
    name: null,
    description : "",
    ap: null,
    ad: null,
    id: 0,
    url: function () {
        return 'http://127.0.0.1:8080/fetchItemById/' + this.id
    },
    //To do our scrubbing we'll parse out the response and instead
    // of getting it as an 'attriubtes' value, we'll parse through
    // it and assign it back to the base set of attr we define.
    parse : function (response){
        console.log(response);
        this.name = response.name;
        this.description = response.sanitzedDescription;


    }
});

var ItemCollection = Backbone.Collection.extend({
    model : ItemModel,
    url : 'http://127.0.0.1:8080/fetchAllItems'
});
