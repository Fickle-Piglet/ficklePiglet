var request = require("request")
module.exports =  {
    getURL : function(redirectURL){
        console.log("here")
        request.get(redirectURL, function (err, lol, body) {
            //console.log(lol.request.uri.href)
            console.log("ERROR", err)
            console.log("THIS ------- THIS: ",lol.request.uri.href)
            //return lol.request.uri.href
        });
    },
    insertEpisodes : function(feedUrl){
        //module.exports.getURL("http://www.podtrac.com/pts/redirect.mp3/media.devchat.tv/js-jabber/JSJ196TabrisJS.mp3?rss=true")
        request({
            method: "GET",
            url: "http://rss2json.com/api.json?rss_url=" + feedUrl
        }, function(err, result, body){
            if(err) { console.log("ERR: ",err)}
            console.log(body)
            var feed = JSON.parse(body).feed
            var episodes = JSON.parse(body).items

            if(episodes !== undefined) {
                if(episodes.length > 0){
                    for (var i = 0; i < episodes.length; i++) {
                        console.log(">>>>>TEST TITLE>>>>>", episodes[i].title)
                        console.log("FULL:", episodes[i].enclosure.link)
                        request({
                            method:"POST",
                            url: "http://localhost:5050/insertEp",
                            json: {
                                title: episodes[i].title,
                                pubDate: episodes[i].pubDate,
                                link: episodes[i].enclosure.link,
                                feed: feed
                            }

                        })
                    }
                }
            }
        })
    }

}


