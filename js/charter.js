/*globals Chart */
//---------------------------------------------------
//Functions to implement chart views for stats


//---------------------------------------------------
// Data

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
            strokeColor: "rgba(43, 43, 232, 1)",
            pointColor: "rgba(43, 43, 232, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(43, 213, 44, 1)",
            pointColor: "rgba(43, 213, 44, 1)",
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
            strokeColor: "rgba(43, 43, 232, 1)",
            pointColor: "rgba(43, 43, 232, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(43, 213, 44, 1)",
            pointColor: "rgba(43, 213, 44, 1)",
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
            strokeColor: "rgba(43, 43, 232, 1)",
            pointColor: "rgba(43, 43, 232, 1)",
            //data: [20, 30, 40, 50, 60]
        },
        {
            label: "Magic Resist",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(43, 213, 44, 1)",
            pointColor: "rgba(43, 213, 44, 1)",
            //data: [5, 10, 15, 20, 25]
        },
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
    var canvas;
    var context;
    //Add in the new data
    //startGAme
    if (divid == "startGame") {
        //copy the linechart
        tempChart = lineChartStart;
        canvas = $('#div1DmgChart');
        canvas = canvas.empty();
        context = canvas.get(0).getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        //lineChartStart = tempChart;

        //need to parse through all the points in each dataset.
       /* var adpoints = new Array;
        var appoints = new Array;
        var defpointsp = new Array;
        var magpoints = new Array;
        var iter = 0;
        for(iter = 0; iter < lineChartStart.datasets[0].points.length; iter++){
            adpoints.push(lineChartStart[0].points[iter]);
        }*/
/*        var deletdmg = lineChartStart.datasets[0].points.length;
        for (ii = 0; ii < deletdmg; ii++) {
            //lineChartDmg.datasets = [];
            lineChartStart.removeData();
            //lineChartDmg.stop();
        }*/
        //lineChartStart = null;
        var lineChartStart = new Chart($('#div1DmgChart').get(0).getContext('2d')).Line(startGameData);
        _.each(startGameDiv, function (id) {
            addDataToChart(getModel(id), lineChartStart);
        });

        lineChartStart.update();
        //lineChartStart = new Chart(canvas).Line(startGameData);
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
