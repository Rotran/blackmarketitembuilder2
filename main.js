/*globals Chart */
$(document).ready(function () {



    var itemCollections = new ItemCollection();
    var allItems = [];

    itemCollections.fetch({
        success: function (models, response, options) {
            console.log("MODELS", models);
            allItems = models.models;
            $("#item-result").itemResults({allItems : allItems});
            $(document).trigger("all-items-loaded");
        }
    });

    console.log("doc ready!");
    $("#filter").load("templates/filter.html", function () {
        $("#filter-accordion").accordion({
            heightStyle: "content"
        });
    });

    $("#drop-items").load("templates/dropped.html", function(){
        $("#startGame").droppable({
            activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				$( this ).find( ".placeholder" ).remove();
				$( "<li></li>" ).text( ui.draggable.text() ).appendTo( this );
            //TODO: after we drop, we should add the item
            // to the list, then reset the dragged item
            // to make it look like it snapped in
        }
        });
    });

    console.log("Loading up our items");

    console.log("Creating the charts!");
    var ctx = $("#firstChart").get(0).getContext("2d");
    console.log(ctx);

    // First chart
    var lineChart = new Chart(ctx).Line(orionData);
    var ctx = $("#secondChart").get(0).getContext("2d");
    var lineChart2 = new Chart(ctx).Line(simpleData);

    //chart defaults:
    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#555"
    };
});
