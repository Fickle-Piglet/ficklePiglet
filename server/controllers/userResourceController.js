var db = require("../../server/db/db.js")


module.exports = {
    likeResource: function(req, res){
        console.log("in like server controller")
        console.log(req.body)
        var userLikes = req.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(r:Resource {name:{ResourceName}}) MERGE (u)-[:HAS_LIKED]->(r)", userLikes, function(err, query){
            if(err){
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    },
    dislikeResource: function(req, res){
        var userDislikes = req.body
        db.cypherQuery("MATCH (u:User {username:{username}}),(r:Resource {name:{ResourceName}}) MERGE (u)-[:HAS_DISLIKED]->(r)", userDislikes, function(err, query){
            if(err){
                res.sendStatus(404);
            } else{
                res.sendStatus(200);
            }
        });
    }
};