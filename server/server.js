var express = require('express');
var path = require('path');
var app = express();
var port = 5050;
var scraper = require("../scripts/scraper/scraper")

app.use(express.static(path.join(__dirname, '/client')));

var neo4j = require('node-neo4j');
var db = new neo4j("http://FicklePiglet:WCdiwRlhygf4M6g5Itvi@ficklepiglet.sb02.stations.graphenedb.com:24789");

app.listen(port, function(){
    console.log('Listening on port '+ port);
});

require('../server/config/middleware.js')(app, express);
require('../server/config/routes.js')(app, express);

// scraper.scrapeFile("podcasts.txt")
scraper.getAllPodcast("podcasts.txt")

setTimeout(function(){
    scraper.readAllFiles();
}, 5000)


//sample query to return everything
db.cypherQuery("START n=node(*) RETURN n;", function(err, result){
    if(err) throw err;
    //console.log(result.data); // delivers an array of query results
});


module.exports = app;

