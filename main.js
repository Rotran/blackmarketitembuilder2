/*globals Chart */
$(document).ready(function () {

    var itemCollections = new ItemCollection();
    var allItems = [];

    itemCollections.fetch({
        success: function (models, response, options) {
            console.log("MODELS", models);
            allItems = models.models;
            $("#item-result").itemResults({
                allItems: allItems
            });
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

    function createDroppable(divId) {
        $("#" + divId).droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: ":not(.ui-sortable-helper)",
            drop: function (event, ui) {
                $(this).find(".placeholder").hide();
                var idd = ui.draggable.find("img").attr("id");
                var template = "<li id=dropped-"+idd+" class=dropped-"+idd+">" + ui.draggable.html().toString()+" <div class=remove-item style=float:right >X</div></li>";
                $("#"+divId+"List").append(template);
                $(".remove-item").on("click", function(){
                    console.log($(this).parent().siblings());
                    if($(this).parent().siblings().length == 1){
                        console.log("ONLY ONE SIB");
                        $(this).parent().parent().find(".placeholder").show();
                    }
                    $(this).parent().remove();
                    console.log("drop remove");
                    console.log(ui.draggable);
                    console.log($(this).sortable('toArray'));
                    removeData();
                });
                var tooltipId = ".dropped-" + idd;
                $(".dropped-"+idd).itemTooltip({itemId : idd, divId : tooltipId});
                generateDataFromDrop(ui.draggable, divId);
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                var idd = $(this).attr("dbid");
                var tooltipId = ".dropped-"+idd;
                $(this).removeClass("ui-state-default").tooltip({itemId : idd, divId: tooltipId});
            },
            update: function(event, ui){
                console.log("updatedddd");
                sortChart($(this).sortable('toArray'), divId);
                console.log($(this));
            }
        });
    }

    $("#drop-items").load("templates/dropped.html", function () {
        createDroppable("startGame");
        createDroppable("midGame");
        createDroppable("endGame");

    });

    var ctx = $("#firstChart").get(0).getContext("2d");

    // First chart for ap and ad
    lineChartDmg = new Chart(ctx).Line(dmgData);
    ctx = $("#secondChart").get(0).getContext("2d");
    // Second chart for defense and spell block
    lineChartDef = new Chart(ctx).Line(defData);

    //chart defaults:
    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#555",
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
});
