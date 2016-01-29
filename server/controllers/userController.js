var db = require("../../server/db/db.js");

module.exports = {
  getUser: function (req, res) {
    //gets info the req
    // console.log("PARAMS: ",req.params);
    // console.log("TYPEOF PARAMS: ",typeof req.params);
    //This needs a json object for some reason
    var user = JSON.parse(req.params.user);
    db.cypherQuery('MATCH (n:User {username:{username}}) RETURN n', user, function (err, result) {
      if (err) { throw err; }
      res.send(result.data);
    });

    //We need to do additional queries for likes and dislikes
    //How should we split those up and then combine them?  
  },
  getLikes: function (req, res) {
    var user = req.body;
    db.cypherQuery('MATCH (u:User {username: "'+user+'"})-[l:HAS_LIKED]-(r:Resource) RETURN l', function (err, result) {
      if (err) {
        throw err;
      }
      res.send(result.data);
    })
  },
  getDislikes: function (req, res) {
    var user = req.body;
    db.cypherQuery('MATCH (u:User {username: "'+user+'"})-[d:HAS_DISLIKED]-(r:Resource) RETURN d', function (err, result) {
      if (err) {
        throw err;
      } 
      res.send(result.data);
    })
  }
};