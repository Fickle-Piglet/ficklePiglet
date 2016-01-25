var noodle = require("noodlejs")
var fs = require("fs")

module.exports = {
    scrape : function(website, title_d, description_d, callback){
        var episodes = "";
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
                episodes += results.results[0].results[i].text;
            }
        }).then(function(){
            noodle.query(description).then(function (results) {
                for(var i=0; i<results.results[0].results.length; i++){
                    episodes += (results.results[0].results[i].text)
                }
            }).then(function(){
                //console.log(episodes)
                callback(episodes, website)
            });
        });
        //return episodes
    },
    scrapeFile : function(file){
        var list = fs.readFileSync("scripts/scraper/files/" + file, "utf8").toString().split("\n");
        var data = {};

        for(var i=0; i<list.length; i++){
            this.scrape(list[i], "title", "description", function(value, website){
                console.log("here")
                //return value
                data[website] = value
                console.log(data)
            });
        }
    }
};

