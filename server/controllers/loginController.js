var db = require("../db/db.js")

module.exports = {
    signin : function(req, res){
        //TODO: Write signin query

    },
    signup: function(req, res){
      var userInfo = req.body
      db.cypherQuery("MATCH (n:User) WHERE n.firstname={firstname} and n.lastname={lastname} and n.username={username} and n.email={email} and n.password={password} return n", userInfo , function(err, result){
            if(err) {
              res.sendStatus(400).json(err);
            } else if (result.data.length!==0) {
              res.send("existing");
            } else {
              db.cypherQuery("create (n:User {firstname:{firstname},lastname:{lastname},username:{username},email:{email},password:{password}}) return n", userInfo , function(err, result){
                    if(err) {
                      res.sendStatus(400).json(err);
                    } else {
                      res.sendStatus(201);
                    }
               });           
            }
        });
    },
    logout: function(req, res){
        //TODO: Write logout function
    }
};