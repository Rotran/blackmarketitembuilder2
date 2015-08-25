/*globals Chart */
$(document).ready(function () {
    console.log("doc ready!");
    $("#filter").load("templates/filter.html", function () {
        $("#filter-accordion").accordion({
            heightStyle: "content"
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
