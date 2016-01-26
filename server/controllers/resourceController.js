var db = require("../../server/db/db.js")


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