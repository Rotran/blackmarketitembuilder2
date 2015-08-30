var restify = require('restify');

var mongojs = require("mongojs");
var db = mongojs("blackmarketdb");
var itemCollection = db.collection("items");

function fetchItemById(req, res, next) {
    var id = req.params.id;
    itemCollection.find({
        id: parseInt(id)
    }, function (err, response) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
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
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.end(allItems);
        return next();
    });
}

restify.CORS.ALLOW_HEADERS.push('authorization');
var server = restify.createServer();
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/fetchItemById/:id', fetchItemById);
server.get('/fetchAllItems', fetchAllItems);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
