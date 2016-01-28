var db = require("../../server/db/db.js")


module.exports = {
    likeResource: function(req, res){
        var userLikes = res.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(r:Resource {name:{ResourceName}}) CREATE (u)-[:HAS_LIKED]->(r)", userLikes, function(err, query){
            if(err){
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    },
    dislikeResource: function(req, res){
        var userDislikes = res.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(r:Resource {name:{ResourceName}}) CREATE (u)-[:HAS_DISLIKED]->(r)", userDislikes, function(err, query){
            if(err){
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    }
};