var databaseUrl = "blackmarketdb";
var collections = ["items"];

var mongojs = require("mongojs");
var db = mongojs(databaseUrl);

var itemCollection = db.collection("items");

/*this is how to save to mongo db*/
//itemCollection.save({
//    _id: 1,
//    name: "testItem",
//    stat: {
//        ap: 2,
//        ad: 3
//    }
//}, function (err, saved) {
//    if (err || !saved) {
//        console.log("SAVE FAILED");
//    } else {
//        console.log("SAVE SUCCESS");
//    }
//});

/*This is how to find in mongodb*/
itemCollection.find({
    id: 3165
}, function (err, docs) {
    console.log(docs);
    db.close();
});

/*Deleting an entity from mongodb*/
//itemCollection.drop({name:"testItem"}, function (err, sucess) {
//    if (err || !saved) {
//        console.log("SAVE FAILED");
//    } else {
//        console.log("SAVE SUCCESS");
//    }
//})
//var request = require("request");

//request.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=", function (data, response, body) {
//
//    var items = JSON.parse(body);
//    var parsedItems = items.data;
//    var length = 0;
//    for (var key in parsedItems) {
//        (function (i) {
//            itemCollection.save(i,
//                function (err, saved) {
//                    if (err || !saved) {
//                        console.log("SAVE FAILED");
//                    } else {
//                        console.log("SAVE SUCCESS");
//                    }
//                });
//        })(parsedItems[key]);
//    }
//    console.log(length);
//}).on("error", function (e) {
//    console.log("Got error, " + e.message);
//});
