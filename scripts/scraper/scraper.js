var noodle = require("noodlejs")
var fs = require("fs")
var http = require("http")
//var app = require("express")();
var request = require("request")

module.exports = {
    getTags : function(searchTerm){
        var search = 'https://itunes.apple.com/search?term='+searchTerm+'&entity=podcast'
        request({
            method: "GET",
            url: search
        }, function(err, res, body){
            body = JSON.parse(body)
            for(var i=0; i<body.results.length; i++){
                var target = {};
                target.name = body.results[i].trackName
                target.genres = body.results[i].genres
                fs.appendFile('../scripts/scraper/files/allocation.txt', JSON.stringify(target) + "\n", function(err){
                    if (err) return console.log(err);
                    console.log("uploaded: ", target.name);
                })
            }
        })
    },
    getAllPodcast: function(file){
        var list = fs.readFileSync("../scripts/scraper/targetFile/" + file, "utf8").toString().split("\n");
        for(var i=0; i<list.length; i++){
            this.getTags(list[i]);
        }
    },
    readAllFiles : function(){
        var list = fs.readFileSync("../scripts/scraper/files/allocation.txt", "utf8").toString().split("\n");
        for(var i=0; i<list.length-1; i++){
            console.log(">>>LIST>>>", JSON.parse(list[i]), "\n")
        }

    }

};

