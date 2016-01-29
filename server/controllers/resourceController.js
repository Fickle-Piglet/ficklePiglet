var db = require("../../server/db/db.js")


module.exports = {
    //Query to insert all Resources with accompanying Tags into the database
    insertResource : function(req, res){
        //console.log(">>>>>>>>>>>>>>REQ", req.body)
        var name = req.body.name;
        var tags = req.body.genre
        var url = req.body.url
        var thumbnail = req.body.thumbnail
        // TODO: Query is Commented out becasue it will run on server startup. Need to rework query
        db.cypherQuery("MERGE (r:Resource {name:'"+name+"', url:'"+url+"', thumbnail:'"+thumbnail+"'}) MERGE (t:Tag {name:'"+tags+"'}) MERGE (r:Resource {name:'"+name+"', url:'"+url+"', thumbnail:'"+thumbnail+"'})-[:TAGGED]-(t:Tag {name:'"+tags+"'})", function(err, res){
        })

    },
    //Query to getgit
    getResource: function(req, res){
        //TODO: Write getResource function. Keyword is just placeholder
        var keyword = (req.body);
        console.log(req.body);
        // console.log(keyword)
        keyword = JSON.stringify(keyword);
        console.log("KEYWORD: ",keyword)
        //This is a map of the array not a filter
        db.cypherQuery("MATCH (n:Resource)-[:TAGGED]-(t:Tag) WHERE t.name IN "+keyword+" RETURN n", function(err, query){

            console.log("ERROR: ", err)
            console.log("HARHARHAR", query)
            //Return's Array of Resource Objects

            //Randomizer function
            var getRandomInt = function(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
            var int = getRandomInt(0, query.data.length)
            console.log(">>>>>SINGLE QUERY DATA",[query.data[int]])
            res.send([query.data[int]]);
        });
    },
    getTags: function(req, res){

        db.cypherQuery("Match (n:Tag) Return n", function(err, response){
            res.send(response.data);
        });
    }
};