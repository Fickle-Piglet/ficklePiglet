var noodle = require("noodlejs")
var fs = require("fs")
var http = require("http")
//var app = require("express")();
var request = require("request")

module.exports = {
    scrape : function(website, title_d, description_d, callback){
        var episodes = "";
        var title2;
        var description = {
            "url": website,
            "selector": description_d,
            "extract": ["text"]
        }
        var title = {
            "url": website,
            "selector": title_d,
            "extract": ["text"]
        }

        noodle.query(title).then(function (results) {
            for(var i=0; i<results.results[0].results.length; i++){
                title2 = results.results[0].results[0]
                episodes += results.results[0].results[i].text;
            }
        }).then(function(){
            noodle.query(description).then(function (results) {
                episodes += "\n"
                for(var i=0; i<results.results[0].results.length; i++){
                    episodes += (results.results[0].results[i].text)
                }
            }).then(function(){
                //console.log(episodes)
                callback(episodes, website, title2)
            });
        });
        //return episodes
    },
    scrapeFile : function(file){
        var list = fs.readFileSync("../scripts/scraper/files/" + file, "utf8").toString().split("\n");
        var data = {};

        for(var i=0; i<list.length; i++){
            this.scrape(list[i], "title", "description", function(value, website, title2){
                console.log("here")
                //return value
                data[website] = value
                //console.log(data)
                fs.writeFile('../scripts/scraper/files/'+ title2.text +'.txt', value, function (err) {
                    if (err) return console.log(err);
                    console.log("uploaded data");
                });

            });
        }
    },
    getTags : function(searchTerm){
        var search = 'https://itunes.apple.com/search?term='+searchTerm+'&entity=podcast'
        request({
            method: "GET",
            url: search
        }, function(err, res, body){
            body = JSON.parse(body)
            //console.log(body)
            for(var i=0; i<body.results.length; i++){
                var target = {};
                target.name = body.results[i].trackName
                target.genres = body.results[i].genres
                fs.writeFile('../scripts/scraper/files/'+ body.results[i].trackName +'.txt', JSON.stringify(target), function(err){
                    if (err) return console.log(err);
                    console.log("uploaded: ", target.name);
                })
            }
        })
    },
    getAllPodcast: function(file){
        var list = fs.readFileSync("../scripts/scraper/targetFile/" + file, "utf8").toString().split("\n");
        for(var i=0; i<list.length; i++){
            console.log(">>>>>>>>>>>>",list[i])
            this.getTags(list[i]);
        }
    }

};

