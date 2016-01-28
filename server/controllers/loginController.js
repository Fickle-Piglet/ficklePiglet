var db = require("../db/db.js")
// db.create()

module.exports = {
  signin : function(req, res){
       var user = req.body;
       db.cypherQuery("MATCH (n:User) WHERE n.username={username} and n.password={password} RETURN n", user, function (err, result) {
        if (err) {
          throw error;
        } else  {
          // console.log(result.data)
          res.send(result.data);
        }
       })
    },
    signup: function(req, res){
      var userInfo = req.body
      db.cypherQuery("MATCH (n:User) WHERE n.firstname={firstname} and n.lastname={lastname} and n.username={name} and n.email={email} and n.password={pword} return n", userInfo , function(err, result){
            if(err) {
              res.sendStatus(404).json(err);
            } else if (result.data.length!==0) {  
              res.send("existing");
            } else {
              //Seems like a strange way to declare properties
              db.cypherQuery("create (n:User {firstname:{firstname},lastname:{lastname},username:{name},email:{email},password:{pword}}) return n", userInfo , function(err, result){
                    if(err) {
                      res.sendStatus(404).json(err);
                    } else {
                      res.sendStatus(result.data);
                    }
                });           
            }
        });
    },
    logout: function(req, res){
        //TODO: Write logout function
    }
};