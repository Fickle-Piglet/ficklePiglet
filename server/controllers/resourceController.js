var db = require("../../server/db/db.js")


module.exports = {
    insertResource : function(req, res){
        console.log(">>>>>>>>>>>>>>REQ", req.body)
        var name = req.body.name;
        var tags = req.body.genre
        var url = req.body.url
        // TODO: Query is Commented out becasue it will run on server startup. Need to rework query
        db.cypherQuery("MERGE (r:Resource {name:'"+name+"'}) MERGE (t:Tag {name:'"+tags+"'}) MERGE (r:Resource {name:'"+name+"', url:'"+url+"'})-[:TAGGED]-(t:Tag {name:'"+tags+"'})", function(err, res){
        })

    },
    getResource: function(req, res){
        //TODO: Write getResource function. Keyword is just placeholder

        var keyword = req || ["Math", "Science"];
        keyword = JSON.stringify(keyword);
        //This is a map of the array not a filter
        db.cypherQuery("MATCH (n:Resource)-[:TAGGED]-(t:Tag) WHERE t.name IN "+keyword+" RETURN n", function(err, query){
            // console.log("ERROR: ", err)
            // console.log("HARHARHAR", res)
            //Return's Array of Resource Objects
            res.send(query.data);
        });
    },
    getTags: function(req, res){
        db.cypherQuery("Match (n:Tag) Return n", function(err, response){
            res.send(response.data);
        });
    }
};