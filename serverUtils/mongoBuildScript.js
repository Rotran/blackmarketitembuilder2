var prompt = require('prompt');
var request = require("request");
var allDirectives = {};

allDirectives.directives = ['saveItem', 'deleteItem', 'populateMongo', 'updateDataDragon'];
//other functions

var databaseUrl = "blackmarketdb";
var collections = ["items"];

var mongojs = require("mongojs");
var db = mongojs(databaseUrl);

var itemCollection = db.collection("items");
var ddragonVersion = db.collection("ddragonVersion");

allDirectives.updateDataDragon = function (key) {
    request.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/versions?api_key=" + key, function (data, response, body) {

        var versions = JSON.parse(body);
        for (var v = 0; v < versions.length; v++) {
            (function (v) {
                console.log(v);
                var version = { name : v, version : Number(v)};
                ddragonVersion.save(version,
                    function (err, saved) {
                        if (err || !saved) {
                            console.log("SAVE FAILED", err);
                        }
                    });
            })(versions[v]);
        }
        console.log("DONE");
        process.exit();
    }).on("error", function (e) {
        console.log("Got error, " + e.message);
    });
}

/*this is how to save to mongo db*/
allDirectives.saveItem = function (params) {
    if (params != undefined) {
        itemCollection.save({
            _id: 1,
            name: "testItem",
            stat: {
                ap: 2,
                ad: 3
            }
        }, function (err, saved) {
            if (err || !saved) {
                console.log("SAVE FAILED");
            } else {
                console.log("SAVE SUCCESS");
            }
        });
    }
};

/*Deleting an entity from mongodb*/
allDirectives.deleteItem = function (params) {
    if (params != undefined) {
        itemCollection.drop({
            name: "testItem"
        }, function (err, sucess) {
            if (err || !saved) {
                console.log("SAVE FAILED");
            } else {
                console.log("SAVE SUCCESS");
            }
        });
    }
};

//need to pass in key
allDirectives.populateMongo = function (key) {
    request.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=" + key, function (data, response, body) {

        var items = JSON.parse(body);
        var parsedItems = items.data;
        var length = 0;
        for (var key in parsedItems) {
            (function (i) {
                itemCollection.save(i,
                    function (err, saved) {
                        if (err || !saved) {
                            console.log("SAVE FAILED", err);
                        }
                    });
            })(parsedItems[key]);
        }
        console.log("DONE");
        process.exit();
        console.log(length);
    }).on("error", function (e) {
        console.log("Got error, " + e.message);
    });
};

var schema = {
    properties: {
        key: {
            message: "Please enter key: ",
            required: true
        },
        directive: {
            message: "Please enter what you would like to do: (" + allDirectives.directives.toString() + ")",
            required: true
        }
    }
};

prompt.get(schema, function (err, result) {
    var key = result.key;
    if (result.directive == "populateMongo" || result.directive == "updateDataDragon") {
        console.log("DIRECTIVE RESULT",result['directive']);
        var dir = result['directive'];
        allDirectives[dir](key);
    } else {
        console.log("Sorry " + result.directive + " is currently unvailable.");
    }
});
