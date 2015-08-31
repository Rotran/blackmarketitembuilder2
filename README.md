# BlackMarketItemBuilder
Black Market Item Builder for Riot 2.0 API Challenge

#About
This project was produced as part of the Riot 2.0 API Challenge. We chose to do the third category, to develop a peice of software which creates a value to the players utilizing the Item Set Documentation.

#Live URL:
http://blackmarket.rotran.io

#Technologies used
We used JavaScript and HTML for our client rendering, utilizing the libraries of jquery, underscore, backbone, and chartjs. For our server, we have an AWS box running Amazon Linux, the database which we store the items is MongoDB. We run our services through Apache and NodeJS using RESTIFY for our API calls.

#Future work
In the future, we would like to expand upon the stats area, we ended up only having time to show the gold cost per item and the overall totals of ad, ap, def and mr into graphs. We also would like to provide a way to upload a JSON item set to visualize your local item build and be able to download an item set you create to use in game! Also the charts tend to degrade in performance the more items that are being rendered, this is something we will be investigating. Another feature we are planning is to filter out items based on game mode.