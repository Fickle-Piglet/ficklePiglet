var neo4j = require('node-neo4j');
var db = new neo4j("http://FicklePiglet:WCdiwRlhygf4M6g5Itvi@ficklepiglet.sb02.stations.graphenedb.com:24789");


module.exports = {
    insertResource : function(req, res){
        console.log(">>>>>>>>>>>>>>REQ", req.body)
        var name = req.body.name;
        var tags = req.body.genre
        // DB query
    },
    getResource: function(req, res){
        //TODO: Write getResource function
    }
};