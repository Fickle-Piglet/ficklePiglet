var db = require("../../server/db/db.js")


module.exports = {
    insertResource : function(req, res){
        console.log(">>>>>>>>>>>>>>REQ", req.body)
        var name = req.body.name;
        var tags = req.body.genre
        // DB query
        //db.cypherQuery("MERGE ("+name+":Resource {name:"+name+"}) MERGE ("+tags+":Tag {name:"+tag+"}) CREATE UNIQUE ")
    },
    getResource: function(req, res){
        //TODO: Write getResource function. Keyword is just placeholder
        var keyword = ["Math", "Science"]
        keyword = JSON.stringify(keyword)
        db.cypherQuery("MATCH (n:Resource)-[:TAGGED]->(t:Tag) WHERE t.name IN "+keyword+" RETURN n", function(err, res){
            console.log("ERROR: ", err)
            console.log("HARHARHAR", res)
        })
    }
};