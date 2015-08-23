    var AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            this.items = new ItemCollection(null, {
                view: this
            });
            //Create a friends collection when the view is initialized.
            //Pass it a reference to this view to create a connection between the two
        },
        events: {
            "click #add-item": "doWork",
        },
        doWork: function () {
            var _name = $("#Name").val();
            var _ad = $("#AD").val();
            var _ap = $("#AP").val();
            var item_model = new ItemModel({
                name: _name,
                ap: _ap,
                ad: _ad
            });
            //Add a new friend model to our friend collection
            this.items.add(item_model);
        },
        addItemLi: function (model) {
            //The parameter passed is a reference to the model that was added
            $("#items-list").append("<li>" + model.get('name') + " " + model.get('ad') + " " + model.get('ap') + "</li>");
            //Use .get to receive attributes of the model
        }
    });
