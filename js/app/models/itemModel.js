var Item = Backbone.Model.extend({
    //Skipping a backend object model, we'll do the scrubbing here
    //and add from the fetch result, populate attr we care about.
    url: function () {
        return './fetchItemById/' + this.id
    }
});
