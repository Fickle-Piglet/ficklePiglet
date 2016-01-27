var db = require("../db/db.js")
// db.create()

module.exports = {
    signin : function(req, res){
       //TODO: Write signin query
     var username = req.body.username;
     var password = req.body.password;
     console.log(username);
     db.readNode({username: username, password: password}, function (err, result) {
     	if (err) {
     		throw error;
     	} else  {
     		res.json(result);
     	}
     })
    },
    signup: function(req, res){
      var userInfo = req.body
      db.cypherQuery("MATCH (n:User) WHERE n.firstname={firstname} and n.lastname={lastname} and n.username={username} and n.email={email} and n.password={password} return n", userInfo , function(err, result){
            if(err) {
              res.status(404).json(err);
            } else if (result.data.length!==0) {
              console.log(result)
              res.status(400).send("Already a user. Please sign in.");
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