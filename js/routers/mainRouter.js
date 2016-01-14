var MainRouter = Backbone.Router.extend({
    routes:{
        "*actions": "defaultRoute"
    }
});
var app_router = new MainRouter;

app_router.on('route:defaultRoute', function(actions){
    alert(actions);
});

Bacbone.history.start();
