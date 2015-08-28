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
            $("#item-filter").filterItems();
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
                var imageId = ui.draggable.find("img").attr("id");
                var template = "<li id="+imageId+"><img class=item-icon src=" + imageSource + "></li>";
                $("#startGameList").append(template);
                //perhaps we have a widget which shows the icon + gold cost??
                generateDataFromDrop(ui.draggable);
                var idd = ui.draggable.find("img").attr("id") ;
                console.log(idd);
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

    var ctx = $("#firstChart").get(0).getContext("2d");

    // First chart
    lineChartDmg = new Chart(ctx).Line(orionData);
    ctx = $("#secondChart").get(0).getContext("2d");
    lineChartDef = new Chart(ctx).Line(simpleData);

    //chart defaults:
    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#555"
    };
});
