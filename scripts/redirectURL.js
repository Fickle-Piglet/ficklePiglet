var request = require("request")
module.exports =  {
    getURL : function(redirectURL){
        request.get(redirectURL, function (err, lol, body) {
            //console.log(lol.request.uri.href)
            return lol.request.uri.href
        });
    },
    insertEpisodes : function(feedUrl,query){
        request({
            method: "GET",
            url: "http://rss2json.com/api.json?rss_url=" + feedUrl
        }, function(err, result, body){
            if(err) { console.log("ERR: ",err)}
            //console.log(body)
            var feed = JSON.parse(body).feed
            var episodes = JSON.parse(body).items
            var eps = [];

            for(var i=0; i<episodes.length; i++){
                console.log(">>>>>TEST TITLE>>>>>",episodes[i].title)
                var link = episodes[i].link
                var title = episodes[i].title
                var description = episodes[i].description;
                var pubDate = episodes[i].pubDate;
                //var link2 = lol.request.uri.href
                //TODO(Josh): REQUEST HAS STUPID ASS ASYNC ISSUE!!! SEE TESTER IN SCRAPER.js
                request.get(link, function (err, lol, body) {
                    //console.log("ERROR", err)
                    console.log("TITL: ",title)
                    eps.push({ title: title, description: description, pubDate: pubDate, link2: lol.request.uri.href, origin: link})
                });

            }
            setTimeout(function(){
                //console.log("feed: ", feed)
                //console.log("Episodes: ", eps)
                //console.log("i: ", i)
                query(eps);
            }, 6000)


        })
    }

}


