/*globals Chart */
//---------------------------------------------------
//Functions to implement chart views for stats


//---------------------------------------------------
// Data
var simpleOptions = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

//TODO: get these to be 6 of them
//Then modify each set based on div to use the data needed

var startGameData = {

    labels: [],
    datasets: [
        {
            label: "AD",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(244, 0, 0, 1)",
            pointColor: "rgba(244, 0, 0, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "AP",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(177, 71, 255, 1)",
            pointColor: "rgba(177, 71, 255, 1)",
            //data: [5, 10, 15, 20, 25]
        },
        {
            label: "Defense",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(48, 48, 50, 1)",
            pointColor: "rgba(48, 48, 50, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(108, 48, 77, 1)",
            pointColor: "rgba(108, 48, 77, 1)",
            //data: [5, 10, 15, 20, 25]
        },
    ]
};

var midGameData = {

    labels: [],
    datasets: [
        {
            label: "AD",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(244, 0, 0, 1)",
            pointColor: "rgba(244, 0, 0, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "AP",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(177, 71, 255, 1)",
            pointColor: "rgba(177, 71, 255, 1)",
            //data: [5, 10, 15, 20, 25]
        },
        {
            label: "Defense",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(48, 48, 50, 1)",
            pointColor: "rgba(48, 48, 50, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(108, 48, 77, 1)",
            pointColor: "rgba(108, 48, 77, 1)",
            //data: [5, 10, 15, 20, 25]
        },
    ]
};

var endGameData = {

    labels: [],
    datasets: [
        {
            label: "AD",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(244, 0, 0, 1)",
            pointColor: "rgba(244, 0, 0, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "AP",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(177, 71, 255, 1)",
            pointColor: "rgba(177, 71, 255, 1)",
            //data: [5, 10, 15, 20, 25]
        },
        {
            label: "Defense",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(48, 48, 50, 1)",
            pointColor: "rgba(48, 48, 50, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(108, 48, 77, 1)",
            pointColor: "rgba(108, 48, 77, 1)",
            //data: [5, 10, 15, 20, 25]
        },
    ]
};

var orionData = {
    labels: ["100", "200", "300", "400", "500"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            //data: [65, 59, 80, 81, 56, 55, 40] //these datapoints will have to be vars
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
            //data: [28, 48, 40, 19, 86, 27, 90]
        } //,
//        {
//            label: "3rd Dataset",
//            fillColor: "rgba(255,0,0,0.3)",
//            strokeColor: "",
//            pointColor: "",
//            pointStrokeColor: "",
//            pointHighlightFill: "rgba(255,0,0,0.3)", //this one is the hover-over color dot key
//            pointHighlightStroke: "rgba(255,0,0,0.3)",
//            data: [10, 15, 20, 25, 35, 45, 65]
//        }
    ]
};

// Users will be dropping items into an area and moving them around
// After each drop, this function should be called to re-do the chart
// The given charts will need to be defined globaly for this to work
function generateDataFromDrop(draggedItem, divID) {

    var itemDraggedID = draggedItem.find("img").attr("id");

    if (divID == "startGame") {
        startGameDiv.push(itemDraggedID);
    } else if (divID == "midGame") {
        midGameDiv.push(itemDraggedID);
    } else if (divID == "endGame") {
        endGAmeDiv.push(itemDraggedID);
    }
    updateCharts(1, divID);
}

function updateCharts(temp, divid) {
    //Reset the totals
    flatPhyTotals = 0;
    flatMagTotals = 0;
    flatDefTotals = 0;
    flatSpellBlockTotals = 0;
    var ii;

    //Add in the new data
    //startGAme
    if (divid == "startGame") {
        var deletdmg = lineChartStart.datasets[0].points.length;
        for (ii = 0; ii < deletdmg; ii++) {
            //lineChartDmg.datasets = [];
            lineChartStart.removeData();
            //lineChartDmg.stop();
        }
        _.each(startGameDiv, function (id) {
            addDataToChart(getModel(id), lineChartStart);
        });
        lineChartStart.update();
    }
    //midgame
    if (divid == "midGame") {
        var deletdmg = lineChartMid.datasets[0].points.length;
        for (ii = 0; ii < deletdmg; ii++) {
            lineChartMid.removeData();
        }
        _.each(midGameDiv, function (id) {
            addDataToChart(getModel(id), lineChartMid);
        });
        lineChartMid.update();
    }
    //endGame:
    if (divid == "endGame") {
        var deletdmg = lineChartEnd.datasets[0].points.length;
        for (ii = 0; ii < deletdmg; ii++) {
            lineChartEnd.removeData();
        }
        _.each(endGAmeDiv, function (id) {
            addDataToChart(getModel(id), lineChartEnd);
        });
        lineChartEnd.update();
    }
}

function getModel(itemID) {
    //The Items:
    var allItems = $("#item-result").itemResults('option', 'allItems');

    var modelid = _.findIndex(allItems, function (item) {
        if (item.id == itemID) {
            return true;
        } else {
            return false;
        }
    });
    return allItems[modelid];
}

function addDataToChart(model, chartdmg) {

    _.each(model.attributes.stats, function (value, key) {
        if (key == flatphydmg) {
            flatPhyTotals += value;
        }
        if (key == flatmagdmg) {
            flatMagTotals += value;
        }
        if (key == flatDef) {
            flatDefTotals += value;
        }
        if (key == flatSpellBlock) {
            flatSpellBlockTotals += value;
        }
    });
    //    console.log("image: ");
    //    console.log(model.get('image'));
    //    console.log(model.get('image').full);
    //    console.log(model);
    var drag = "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/";
    //flatphydmg += tempphydmg;
    //flatmagdmg += tempmagdmg;

    chartdmg.addData([flatPhyTotals, flatMagTotals, flatDefTotals, flatSpellBlockTotals], model.get('name'));
}

function sortChart(newArray, divID) {
    // getting an array of ["dropped-1029", "dropped-1006", "dropped-1001"]
    var IDs = scrubData(newArray);

    if (divID == "startGame") {
        startGameDiv = IDs;
    } else if (divID == "midGame") {
        midGameDiv = IDs;
    } else if (divID == "endGame") {
        endGAmeDiv = IDs;
    }
    updateCharts(0, divID);
}

function scrubData(dirtData) {
    var dataSet = [];
    _.each(dirtData, function (data) {
        //remove the "dropped-"
        dataSet.push(data.substring(8, data.length));
    });

    return dataSet;
}

function removeData() {
    //do something??
    lineChartDef.removeData();
    lineChartDef.update();
}

function getItemCount() {
    var count = 0;
    count += startGameDiv.length;
    count += midGameDiv.length;
    count += endGAmeDiv.length;
    return count;
}

//---------------------------------------------------
// Variables

//DataStats to parse out
var flatphydmg = "FlatPhysicalDamageMod";
var flatmagdmg = "FlatMagicDamageMod";
var flatDef = "FlatArmorMod";
var flatSpellBlock = "FlatSpellBlockMod";

//DataAdded for totals
var flatPhyTotals = 0;
var flatMagTotals = 0;
var flatDefTotals = 0;
var flatSpellBlockTotals = 0;

//Global variables
//The charts:
var lineChartStart;
var lineChartMid;
var lineChartEnd;

//The Models within the the divs
//Data looks like: ["1001", "1003", ...]
var startGameDiv = new Array;
var midGameDiv = new Array;
var endGAmeDiv = new Array;
