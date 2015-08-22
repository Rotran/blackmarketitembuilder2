var restify = require('restify');

var mongojs = require("mongojs");
var db = mongojs("blackmarketdb");
var itemCollection = db.collection("items");

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

function fetchItemById(req, res, next) {
    var id = req.params.id;

    itemCollection.find({
        id: 3165
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

var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/hello/:name', respond);
server.get('/fetchItemById/:id', fetchItemById);
server.get('/fetchAllItems', fetchAllItems);
server.head('/hello/:name', respond);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
