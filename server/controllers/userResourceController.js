var db = require("../../server/db/db.js")


module.exports = {
  likeResource: function(req, res){
    console.log("in like server controller")
    console.log(req.body)
    var userLikes = req.body
    db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{episodeTitle}}), (r: Resource {name: {showName}}) MERGE (e)<-[:HAS_LIKED]-(u) MERGE (u)-[:HAS_LIKED]-(r)", userLikes, function(err, query){
      if(err){
          res.sendStatus(404);
      } else{
          res.sendStatus(200);
      }
    });
  },
  dislikeResource: function(req, res){
    var userDislikes = req.body
    db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{episodeTitle}}), (r: Resource {name: {showName}}) MERGE (e)<-[:HAS_DISLIKED]-(u) MERGE (u)-[:HAS_DISLIKED]-(r)", userDislikes, function(err, query){
      if(err){
          res.sendStatus(404);
      } else{
          res.sendStatus(200);
      }
    });
  },
  markAsSeen: function(req, res){
    var userHasSeen = req.body
    db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{ResourceName}}) MERGE (u)-[:HAS_SEEN]->(e)", userHasSeen, function(err, query){
      if(err){
          res.sendStatus(404);
      } else{
          res.sendStatus(200);
      }
    });
  },
  removeRelationship: function(req, res){
    var userPref = req.body;
    console.log("Final Server Controller: ",userPref);
    db.cypherQuery("MATCH (u:User {username:{username}})-[n]-(e:Episode {title:{episodeTitle}}) DELETE n", userPref, function(err, query){
      if(err){
          console.log(err);
          res.sendStatus(404);
      } else{
          res.sendStatus(200);
      }
    });
  }
};