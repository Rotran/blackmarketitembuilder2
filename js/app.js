//This is the app file that sets up the requirejs and fires off our main.js file to run everything

require.config({

    "paths" : {
        "jquery" : "libs/jquery.min",
        "jqueryui" : "libs/jquery-ui.min",
        "underscore" : "libs/underscore",
        "backbone" : "libs/backbone",
        "chartjs" : "libs/chart.min"
    }
});

//now initilize and run our main.js stuff
//we're going to load widgets here.
require([
    'main',
], function(Main){
    //we need to reformat main to have an initialize function so we can do
    ////Main.initialize();
});
