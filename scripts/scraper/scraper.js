var noodle = require("noodlejs")
var fs = require("fs")
var http = require("http")
var request = require("request")
var insertEp = require("../../scripts/redirectURL.js")

module.exports = {
    //Reads the podcasts (or specified target) file and sends the tags to the getTags Methods
    getAllPodcast: function(file){
        var list = fs.readFileSync("../scripts/scraper/targetFile/" + file, "utf8").toString().split("\n");
        for(var i=0; i<list.length; i++){
            this.getTags(list[i]);
        }
    },
    //Takes each resource received from the getAllPodcast method and queries the iTunes API for relevant podbasts
    // and writes to allocation.txt file in form {"name":"Name of Resource","genres":["tag1","tag2","tag3"],"url":"https://example.com"}
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
                        target.url = body.results[i].collectionViewUrl
                        target.thumbnail = body.results[i].artworkUrl100
                        target.feedUrl = body.results[i].feedUrl
                fs.appendFile('../scripts/scraper/files/allocation.txt', JSON.stringify(target) + "\n", function(err){
                    if (err) console.log(err);
                    console.log("uploaded: ", target.name);
                })
            }
        })
    },
    //Reads each file on allocation.txt and sends a POST request to the server '/insert' with properties name, genre, url.
    // The server is suppose to send it to the resourceController and call the insertResource method
    readAllFiles : function(){
        var list = fs.readFileSync("../scripts/scraper/files/allocation.txt", "utf8").toString().split("\n");
        for(var i=0; i<list.length-1; i++){
            list[i] = JSON.parse(list[i]);
            for(var j=0; j<list[i].genres.length-1; j++){
                request({
                    method: "POST",
                    url: "http://52.36.85.255/insert",
                    json: {
                        name: list[i].name,
                        genre: list[i].genres[j],
                        url: list[i].url,
                        thumbnail: list[i].thumbnail,
                        feedUrl: list[i].feedUrl,
                        episodes: []
                    }
                }, function(err, res, body){
                    //if(err) console.log("ERROR: ",err)
                    //res.end()
                })
            }
        }

    },
    tester: function(counter, max){
        if(counter === max){
            return
        }
        var counter = counter || 0;
        console.log("COUNTER: ",counter);
        setTimeout(function(){
            var list = fs.readFileSync("../scripts/scraper/files/allocation.txt", "utf8").toString().split("\n");
            var item = JSON.parse(list[counter])
            insertEp.insertEpisodes(item.feedUrl)
            counter++
            module.exports.tester(counter, list.length-1);
        }, 180000)
    }

};



