var request = require("request")
module.exports = getURL = function(redirectURL){
    request.get(redirectURL, function (err, lol, body) {
        console.log(lol.request.uri.href)
        return lol.request.uri.href
    });
}

getURL("http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/audio/snw/snw0001/snw0001.mp3")