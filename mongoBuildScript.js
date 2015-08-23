(function () {

    var allDirectives = {};

    //other functions
    allDirectives.function1 = function () {
        console.log("I WAS CALLED");
    };

    var databaseUrl = "blackmarketdb";
    var collections = ["items"];

    var mongojs = require("mongojs");
    var db = mongojs(databaseUrl);

    var itemCollection = db.collection("items");

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


    allDirectives.testFind = function () {

        /*This is how to find in mongodb*/
        itemCollection.find({
            id: 3165
        }, function (err, docs) {
            console.log(docs);
            db.close();
        });
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
    allDirectives.populateMongo = function () {
        var request = require("request");
        request.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=", function (data, response, body) {

            var items = JSON.parse(body);
            var parsedItems = items.data;
            var length = 0;
            for (var key in parsedItems) {
                (function (i) {
                    itemCollection.save(i,
                        function (err, saved) {
                            if (err || !saved) {
                                console.log("SAVE FAILED");
                            } else {
                                console.log("SAVE SUCCESS");
                            }
                        });
                })(parsedItems[key]);
            }
            console.log(length);
        }).on("error", function (e) {
            console.log("Got error, " + e.message);
        });

    };

    //ACTUAL DIRECTIVE RUNNING.
    var argCheck = process.argv.length > 3 ? 0 : 1;

    if (!argCheck) {
        console.error("To many arguments.");
    } else {
        var directive = process.argv[2];
        if (allDirectives[directive] != undefined) {
            allDirectives[directive]();
        } else {
            console.error("No directive mapped to command.");
        }
    }

})();
