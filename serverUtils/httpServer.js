var restify = require('restify');
var prompt = require('prompt');
var mongojs = require("mongojs");
var db = mongojs("blackmarketdb");
var itemCollection = db.collection("items");
var ddragonVersion = db.collection("ddragonVersion");

function fetchItemById(req, res, next) {
    var id = req.params.id;
    itemCollection.find({
        id: parseInt(id)
    }, function (err, response) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(response[0]));
    });
    return next();
}

function fetchAllItems(req, res, next) {
    itemCollection.find(function (err, data) {
        var allItems = JSON.stringify(data);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(allItems);
        return next();
    });
}

function getLatestDDragonVersion(req, res, next) {
    var latestVersion = ddragonVersion.find(function (err, data) {
        var latestVer = JSON.stringify(data);
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(data);
        return next();
    });
}

var server = restify.createServer();
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.use(restify.fullResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/fetchItemById/:id', fetchItemById);
server.get('/fetchAllItems', fetchAllItems);
server.get('/getLatestDDragonVersion', getLatestDDragonVersion);

server.get(/.*/, restify.serveStatic({
    'directory': '../.',
    'file': 'index.html'
}));

prompt.start();
var port = 80;
prompt.get(['mode'], function (err, result) {
    if (result.mode === 'dev') {
        port = 3000;
    }
    server.listen(port, function () {
        console.log('%s listening at %s', server.name, server.url);
    });
});
