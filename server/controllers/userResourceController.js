var db = require("../../server/db/db.js")


module.exports = {
    likeResource: function(req, res){
        console.log("in like server controller")
        console.log(req.body)
        var userLikes = req.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{ResourceName}}), (r: Resource {name: {ResourceName}}) MERGE (r)<-[:HAS_LIKED]-(u)-[:HAS_LIKED]->(e)-[:EPISODE_OF]->(r) MERGE (u)-[:HAS_LIKED]-(r)", userLikes, function(err, query){
            if(err){
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    },
    dislikeResource: function(req, res){
        var userDislikes = req.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{ResourceName}}), (r: Resource {name: {ResourceName}}) MERGE (u)-[:HAS_DISLIKED]-(r) MERGE (u)-[:HAS_DISLIKED]->(e)", userDislikes, function(err, query){
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
        db.cypherQuery("MATCH (u:User {username:{username}})-[n]-(e:Resource {name:{ResourceName}}) DELETE n", userPref, function(err, query){
            if(err){
                console.log(err);
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    }

};