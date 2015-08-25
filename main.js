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

<<<<<<< HEAD
    // First chart
    var lineChart = new Chart(ctx).Line(orionData);
    var ctx = $("#secondChart").get(0).getContext("2d");
    var lineChart2 = new Chart(ctx).Line(simpleData);


    //chart defaults:

    Chart.defaults.global = {
        showScale: true,
        scaleFontColor: "#555"
    };
=======
    //Not sure this one does anything usefull, just took off what I had in orionhub
    var mynewChart = new Chart(ctx);
    // this is most likely the chart that should be one that is viewed, since it has data...
    console.log(data);
    var lineChart = new Chart(ctx).Line(data, {
        bezierCurve: true
    });
>>>>>>> origin/master
});
