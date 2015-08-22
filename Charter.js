//---------------------------------------------------
//Functions to implement chart views for stats

function basicChart() {
    "use strict";


}

function lolStuff() {

}

var simpleData = {

    labels: ["100", "200", "300", "400", "500"],
    datasets: [
        {
            label: "AD",
            fillColor: "rgba(244, 0, 0, 1)",
            strokeColor: "rgba(244, 0, 0, 1)",
            pointColor: "rgba(244, 0, 0, 1)"
        },
        {
            label: "AP",
            fillColor: "rgba(177, 71, 255, 1)",
            strokeColor: "rgba(177, 71, 255, 1)",
            pointColor: "rgba(177, 71, 255, 1)"
        },
    ]
};

$(function () {

    Item = Backbone.Model.extend({
        //Create a model to hold friend atribute
        name: null,
        ap: null,
        ad: null
    });

    Items = Backbone.Collection.extend({
        //This is our Friends collection and holds our Friend models
        initialize: function (models, options) {
            this.bind("add", options.view.addItemLi);
            //Listen for new additions to the collection and call a view function if so
        }
    });

    AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            this.items = new Items(null, {
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
            var item_model = new Item({
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

    var MyChartView = Backbone.View.extend({

    });

    var appview = new AppView;

});
