$(document).ready(function () {
    console.log("doc ready!");
    $("#filter").load("templates/filter.html", function () {
        $("#filter-accordion").accordion({
            heightStyle: "content"
        });
    });

    console.log("Loading up our items");

    console.log("Creating the charts!");
    var ctx = $("#firstChart")[0].getContext("2d");
    console.log(ctx);

    //Not sure this one does anything usefull, just took off what I had in orionhub
    var mynewChart = new Chart(ctx);
    // this is most likely the chart that should be one that is viewed, since it has data...
    var lineChart = Chart(ctx).Line(orionData, {
        bezierCurve: true
    });
});
