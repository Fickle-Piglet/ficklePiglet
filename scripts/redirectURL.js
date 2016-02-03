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
    insertEpisodes : function(feedUrl,query){
        //module.exports.getURL("http://www.podtrac.com/pts/redirect.mp3/media.devchat.tv/js-jabber/JSJ196TabrisJS.mp3?rss=true")
        var eps2 = [];
        request({
            method: "GET",
            url: "http://rss2json.com/api.json?rss_url=" + feedUrl
        }, function(err, result, body){
            if(err) { console.log("ERR: ",err)}
            //console.log(body)
            var feed = JSON.parse(body).feed
            var episodes = JSON.parse(body).items
            eps2 = episodes;

            if(episodes !== undefined) {
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
                    //eps.push({title: episodes[i].title, pubDate: episodes[i].pubDate, link: episodes[i].enclosure.link})
                    //var originURL = episodes[i].enclosure.link
                    //TODO(Josh): REQUEST HAS STUPID ASS ASYNC ISSUE!!! SEE TESTER IN SCRAPER.js
                    //var epReq = function(i){
                    //    request.get(episodes[i].enclosure.link, function (err, lol, body) {
                    //        console.log("RESP: ",lol.request.uri.href)
                    //        //console.log("ERROR", err)
                    //        //console.log("TITL: ",title ,lol.request.uri.href)
                    //        //console.log(">>>>>>>TITLE 2>>>>>>",{ title: episodes[i].title, description: episodes[i].description, pubDate: episodes[i].pubDate, link2: lol.request.uri.href, origin: episodes[i].link})
                    //        eps.push({ title: episodes[i].title, description: episodes[i].description, pubDate: episodes[i].pubDate, link2: lol.request.uri.href, origin: episodes[i].enclosure.link})
                    //    });
                    //}
                    //epReq(i);


                }
            }
            //setTimeout(function(){
            //    //console.log("feed: ", feed)
            //    //console.log("Episodes: ", eps)
            //    //console.log("i: ", i)
            //    console.log("in set timeout")
            //    query(eps);
            //}, 5000)


        })
    }

}


