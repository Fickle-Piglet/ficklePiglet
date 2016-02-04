var db = require("../server/db/db.js");
var elastic = require("../server/controllers/esearch");

db.cypherQuery("Match (t:Tag) return t", function (err, result) {
 if (err) {
   throw err;
 } else  {
  bulkLoadPodcasts(result.data);
 }
});
        
function bulkLoadPodcasts(podcasts) {
  console.log("podcasts in main",podcasts);

  elastic.indexExists().then(function (exists) {  
    if (exists) {
      return elastic.deleteIndex();
    }
  }).then(function () {
    return elastic.initIndex().then(elastic.initMapping).then(function () {
      //Add a few titles for the autocomplete
      //elasticsearch offers a bulk functionality as well, but this is for a different time
      podcasts.map(function (podcast) {
        if (podcast.url){
          return elastic.addDocument({
            name: podcast.name,
            url: podcast.url,
            feedUrl: podcast.feedUrl,
            thumbnail : podcast.thumbnail,
            metadata: {
              titleLength: Object.keys(podcast).length
            }
          });
        } else {
          return elastic.addDocument({
            name: podcast.name,
            url: null,
            feedUrl: null,
            thumbnail : null,
            metadata: {
              titleLength: Object.keys(podcast).length
            }
          });
        }
      });
      db.cypherQuery("Match (r:Resource) RETURN r", function (err, result) {
       if (err) {
         throw err;
       } else  {
         result.data.map(function (podcast) {
          return elastic.addDocument({
            name: podcast.name,
            url: podcast.url,
            feedUrl: podcast.feedUrl,
            thumbnail : podcast.thumbnail,
            metadata: {
              titleLength: Object.keys(podcast).length
            }
          });
        }); 
       }
      });
      return Promise.all(podcasts);
    });
  }); 
}