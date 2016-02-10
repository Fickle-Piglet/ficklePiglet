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

// test.getlikes({body:'timmy'});

require('../server/config/middleware.js')(app, express);
require('../server/config/routes.js')(app, express);

//scraper.getAllPodcast("podcasts.txt")


// setTimeout(function(){
        //scraper.readAllFiles();
        //scraper.tester()
        // fakeData()
//         jaccard();
// }, 2000);




//sample query to return everything
// db.cypherQuery("START n=node(*) RETURN n;", function(err, result){
//     if(err) throw err;
//     // console.log(result.data); // delivers an array of query results
// });


module.exports = app;