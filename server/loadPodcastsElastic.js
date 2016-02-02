var db = require("../server/db/db.js");
var elastic = require("../server/controllers/esearch");

db.cypherQuery("MATCH (n:Resource) RETURN n", function (err, result) {
 if (err) {
   throw error;
 } else  {
  bulkLoadPodcasts(result.data)
 }
});
        
function bulkLoadPodcasts(podcasts) {
  console.log("podcasts in main",podcasts)

  elastic.indexExists().then(function (exists) {  
    if (exists) {
      return elastic.deleteIndex();
    }
  }).then(function () {
    return elastic.initIndex().then(elastic.initPodcastMapping).then(function () {
      //Add a few titles for the autocomplete
      //elasticsearch offers a bulk functionality as well, but this is for a different time
      podcasts.map(function (podcast) {
        console.log("Podcast:",podcast)
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
      return Promise.all(podcasts);
    });
  }); 
}