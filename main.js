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
            $("#search-button").itemSearch();
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
                var imageSource = ui.draggable.find("img").attr("src");
                var template = "<li><img class=item-icon src=" + imageSource + "></li>";
                $("#startGameList").append(template);
            //TODO: after we drop, we should add the item
            // to the list
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function(){
                $(this).removeClass("ui-state-default");
            }
        });
        //midGame
        $("#midGame").droppable({
            activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				$( this ).find( ".placeholder" ).remove();
				var imageSource = ui.draggable.find("img").attr("src");
                var template = "<li><img class=item-icon src=" + imageSource + "></li>";
                $("#midGameList").append(template);
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function(){
                $(this).removeClass("ui-state-default");
            }
        });
        //endGame
        $("#endGame").droppable({
            activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			accept: ":not(.ui-sortable-helper)",
			drop: function( event, ui ) {
				$( this ).find( ".placeholder" ).remove();
				var imageSource = ui.draggable.find("img").attr("src");
                var template = "<li><img class=item-icon src=" + imageSource + "></li>";
                $("#endGameList").append(template);
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function(){
                $(this).removeClass("ui-state-default");
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
