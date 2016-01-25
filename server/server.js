var express = require('express');
var path = require('path');
var app = express();
var port = 5050;
var scraper = require("../scripts/scraper/scraper")

app.use(express.static(path.join(__dirname, '/../client')));

app.listen(port, function(){
    console.log('Listening on port '+ port);
});

scraper.scrapeFile("text.txt")



module.exports = app;