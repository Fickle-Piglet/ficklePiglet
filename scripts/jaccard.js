var db = require("../server/db/db.js");
var _ = require('lodash');
var users;



var compare = function(userOne, userTwo,callback) {
// console.log("1: ", userOne, "2: ", userTwo);
var userOneLikes;
var userTwoLikes;
var UserOneDislikes;
var UserTwoDislikes;
// console.log("UserOne: ", userOne);
// console.log("UserTwo: ", userTwo);
  
  db.cypherQuery("MATCH (u:User {username:'" + userOne + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res){
    if (err) {console.log("Error: with ",userOne," ", err);}
    userOneDislikes = res.data;
    // console.log("typeof userOneDislikes: ", typeof userOneDislikes);
    
    db.cypherQuery("MATCH (u:User {username:'" + userTwo + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res){
      if (err) {console.log("Error: with ",userTwo," ", err);}
      userTwoDislikes = res.data;
      // console.log("typeof userTwoDislikes: ", typeof userTwoDislikes);

      db.cypherQuery("MATCH (u:User {username:'" + userOne + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
        if (err) {console.log("Error: with ",userOne," ", err);}
        userOneLikes = res.data;
        // console.log("typeof userOnelikes: ", typeof userOneLikes);

        db.cypherQuery("MATCH (u:User {username:'" + userTwo + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
          if (err) {console.log("Error: with ",userTwo," ", err);}
          userTwoLikes = res.data;
          // console.log("typeof userTwolikes: ", typeof userTwoLikes);
          // console.log("userOneLikes: ", userOneLikes.length);
          // console.log("userTwoLikes: ", userTwoLikes.length);
          var union = _.union(userOneLikes, userTwoLikes, userOneDislikes, userTwoDislikes).length;
          var like = _.intersection(userOneLikes, userTwoLikes).length;
          var dislike = _.intersection(userOneDislikes, userTwoDislikes).length;
          var likedislike = _.intersection(userOneLikes, userTwoDislikes).length;
          var dislikelike = _.intersection(userOneDislikes, userTwoLikes).length;
          var similarityIndex = (like + dislike - likedislike - dislikelike)/union; 
          // console.log("DA ANSWER: ", similarityIndex);


          db.cypherQuery("MATCH (u1:User {username:'" + userOne + "'}), (u2:User {username:'" + userTwo + "'}) MERGE (u1)-[:SIMILARITY {score: '" + similarityIndex + "'}]->(u2)", function(err, res){
            if (err) { console.log (err); }
            // console.log("RES: ", res);
            // return res;
            // callback(userOne);
            console.log("Yay it worked!");
          });
        });
      });
    });
  });
};


function makeUserSimalarities (){

  db.cypherQuery("MATCH (u:User) return u.username", function(err, res){
    users = res.data;
    // console.log("USERS: ", users[0]);
    // console.log("USERS TYPE: ",typeof users[0]);


    for (var i = 60; i < 80; i ++) {
      for (var j = i + 1; j < 80; j++) {
          compare(users[i], users[j]);
          // , function(userOne){
          // console.log("Done with user:  ", userOne);
        // });
      }
      // console.log('Completed user: ',i," of ", users.length);
      // console.log(i);
    }
    // console.log(res.data);
  });
  
}

makeUserSimalarities ();
  //Find number of similar likes
  //Find number of similar dislikes
  //total length =


// compare('Laverne2','Lynell2');



