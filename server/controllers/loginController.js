var db = require("../db/db.js")

module.exports = {
    signin : function(req, res){
        //TODO: Write signin query

    },
    signup: function(req, res){
      var userInfo = req.body
      db.cypherQuery("MATCH (n:User) WHERE n.firstname={firstname} and n.lastname={lastname} and n.username={username} and n.email={email} and n.password={password} return n", userInfo , function(err, result){
            if(err) {
              // res.status(404).json(err);
              res.send("error")
            } else if (result.data.length!==0) {
              res.send("already a user")
              // res.status(403).send("Already a user. Please sign in.");
            } else {
              db.cypherQuery("create (n:User {firstname:{firstname},lastname:{lastname},username:{username},email:{email},password:{password}}) return n", userInfo , function(err, result){
                    if(err) {
                      res.status(404).json(err);
                    } else {
                      res.status(200);
                    }
                });           
            }
        });
    },
    logout: function(req, res){
        //TODO: Write logout function
    }
};