//---------------------------------------------------
//Functions to implement chart views for stats

function basicChart() {
    "use strict";


}

function lolStuff() {

}

var simpleOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


var simpleData = {

    labels: ["100", "200", "300", "400", "500"],
    datasets: [
        {
            label: "AD",
            fillColor: "rgba(244, 0, 0, 1)",
            strokeColor: "rgba(244, 0, 0, 1)",
            pointColor: "rgba(244, 0, 0, 1)",
            data: [20, 30, 40, 50, 60]
        },
        {
            label: "AP",
            fillColor: "rgba(177, 71, 255, 1)",
            strokeColor: "rgba(177, 71, 255, 1)",
            pointColor: "rgba(177, 71, 255, 1)",
            data: [5, 10, 15, 20, 25]
        },
    ]
};

var orionData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40] //these datapoints will have to be vars
            //They could be based on the view collection of items we have first one second...
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
        	label: "3rd Dataset",
        	fillColor: "rgba(255,0,0,0.3)",
        	strokeColor: "",
        	pointColor: "",
        	pointStrokeColor: "",
        	pointHighlightFill: "rgba(255,0,0,0.3)", //this one is the hover-over color dot key
        	pointHighlightStroke: "rgba(255,0,0,0.3)",
        	data: [10, 15, 20, 25, 35, 45, 65]
        }
    ]
};

var MyChartView = Backbone.View.extend({

});

// Users will be dropping items into an area and moving them around
// After each drop, this function should be called to re-do the chart
// The given charts will need to be defined globaly for this to work
// After each drop we can just go through and do all the charts for simplicity
function generateDataFromDrop(draggedItem){
    console.log("item was dropped, callback func!");
    console.log(draggedItem);
    //logic should be done here to dete
    lineChartDmgData();
    lineChartDefData();
    lineChartDmg.addData([20, 30], "August");
    //Now need to call update!

}

// Charts:
function lineChartDmgData(){
    var datasets = [];
    //Change the datasets
    //Will returning update? probs not...
    return datasets;
}
function lineChartDefData(){
    var datasets = [];
    //Change stuff
    return datasets;
}

//Global variables for the charts.
var lineChartDmg;
var lineChartDef;

var appview = new AppView;
