var express = require('express');
var path = require('path');
var app = express();
var port = 5050;
var scraper = require("../scripts/scraper/scraper")
var fakeData = require("../scripts/fakeData.js")
var db = require("../server/db/db.js");
var jaccard = require("../scripts/jaccard.js");

// var test = require("../server/controllers/userController");

// app.use(express.static(path.join(__dirname, '/client')));

app.listen(port, function(){
    console.log('Listening on port '+ port);
});


require('../server/config/middleware.js')(app, express);
require('../server/config/routes.js')(app, express);



////////UNCOMMENT THIS SECTION WHEN INITIALIZING DATABASE///////
//scraper.getAllPodcast("podcasts.txt")
//setTimeout(function(){
        //scraper.readAllFiles();
        //scraper.tester()
        //jaccard();
//}, 1000)
////////////////////////////////////////////////////////////////

module.exports = app;