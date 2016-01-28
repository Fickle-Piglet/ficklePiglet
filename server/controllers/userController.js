var db = require("../../server/db/db.js");

module.exports = {
  getUser: function (req, res) {
    //gets info the req
    db.cypherQuery('MATCH(n:User {username:username} return n', user, function (err, result) {
      if (err) { throw error; }
      res.send(result.data);
    });

    //We need to do additional queries for likes and dislikes
    //How should we split those up and then combine them?  
  }
};