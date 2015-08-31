/*globals Chart */
$(document).ready(function () {

    var itemCollections = new ItemCollection();
    var allItems = [];

    itemCollections.fetch({
        success: function (models, response, options) {
//            console.log("MODELS", models);
            allItems = models.models;
            $("#item-result").itemResults({
                allItems: allItems
            });
            $(document).trigger("all-items-loaded");
            $("#search-button").itemSearch();
            $("#item-filter").filterItems();
        }
    });

//    console.log("doc ready!");
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
                    if ($(this).parent().siblings().length == 1) {
//                        console.log("ONLY ONE SIB");
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
                sortChart($(this).sortable('toArray'), divId);
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
    ctx1dmg = $("#div1DmgChart").get(0).getContext("2d");
    lineChartStart = new Chart(ctx1dmg).Line(startGameData);
    //---------------------------------------------------
    // Mid game charts
    ctx2dmg = $("#div2DmgChart").get(0).getContext("2d");
    lineChartMid = new Chart(ctx2dmg).Line(midGameData);
    //---------------------------------------------------
    // End game charts
    ctx3dmg = $("#div3DmgChart").get(0).getContext("2d");
    lineChartEnd = new Chart(ctx3dmg).Line(endGameData);


    //chart defaults:
    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#154",
        scaleShowLabels: false,
        animation: false
    };
});

var ctx1dmg;
var ctx1def;
var ctx2dmg;
var ctx2def;
var ctx3dmg;
var ctx3def;
