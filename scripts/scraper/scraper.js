var noodle = require("noodlejs")
var fs = require("fs")
var http = require("http")
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
            list[i] = JSON.parse(list[i]);
            for(var j=0; j<list[i].genres.length; j++){
                //console.log(">>>LIST>>>", list[i].name, list[i].genres[j], "\n")
                request({
                    method: "POST",
                    url: "http://localhost:5050/insert",
                    json: {
                        name: list[i].name,
                        genre: list[i].genres[j]
                    }
                }, function(err, res, body){
                    //console.log("YAY", body)
                })
            }
        }

    }

};

