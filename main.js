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
                var template = "<li id=dropped-" + idd + " class=dropped-" + idd + ">" + ui.draggable.html().toString() + " <div class=remove-item style=float:right >X</div></li>";
                $("#" + divId + "List").append(template);
                $(".remove-item").on("click", function () {
                    //console.log("siblings: " + $(this).parent().siblings());
                    if ($(this).parent().siblings().length == 1) {
                        console.log("ONLY ONE SIB");
                        $(this).parent().parent().find(".placeholder").show();
                    }
                    $(this).parent().remove();
                    sortChart($("#" + divId).sortable('toArray'), divId);
                });
                var tooltipId = ".dropped-" + idd;
                $(".dropped-" + idd).itemTooltip({
                    itemId: idd,
                    divId: tooltipId
                });
                generateDataFromDrop(ui.draggable, divId);
            }
        }).sortable({
            items: "li:not(.placeholder)",
            sort: function () {
                var idd = $(this).attr("dbid");
                var tooltipId = ".dropped-" + idd;
                $(this).removeClass("ui-state-default").tooltip({
                    itemId: idd,
                    divId: tooltipId
                });
            },
            update: function (event, ui) {
                //console.log("In sortable update!!!! " + $(this));
                sortChart($(this).sortable('toArray'), divId);
            },
            change: function(event, ui){
                //console.log("Change is happening");
            }
        });
    }

    $("#drop-items").load("templates/dropped.html", function () {
        createDroppable("startGame");
        createDroppable("midGame");
        createDroppable("endGame");
    });

    //---------------------------------------------------
    // Start game charts
    var ctx = $("#div1DmgChart").get(0).getContext("2d");
    lineChartDmg = new Chart(ctx).Line(dmgData);
    ctx = $("#div1DefChart").get(0).getContext("2d");
    lineChartDef = new Chart(ctx).Line(defData);
    //---------------------------------------------------
    // Mid game charts
    ctx = $("#div2DmgChart").get(0).getContext("2d");
    lineChartDmgdiv2 = new Chart(ctx).Line(dmgData);
    ctx = $("#div2DefChart").get(0).getContext("2d");
    lineChartDefdiv2 = new Chart(ctx).Line(defData);
    //---------------------------------------------------
    // End game charts
    ctx = $("#div3DmgChart").get(0).getContext("2d");
    lineChartDmgdiv3 = new Chart(ctx).Line(dmgData);
    ctx = $("#div3DefChart").get(0).getContext("2d");
    lineChartDefdiv3 = new Chart(ctx).Line(defData);


    //chart defaults:
    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#555"
    };
});
