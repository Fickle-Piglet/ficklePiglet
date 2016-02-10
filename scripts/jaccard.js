var Promise = require("bluebird");
var db = require("../server/db/db.js");
var _ = require('lodash');
var users;



var compare = function(userOne, userTwo,callback) {
var userOneLikes;
var userTwoLikes;
var UserOneDislikes;
var UserTwoDislikes;
var argumentsArr = [];
// console.log("UserOne: ", userOne);
// console.log("UserTwo: ", userTwo);
db.cypherQuery("MATCH (u:User) return u.username", function(err, res){
  users = res.data; 
  for (var i = 0; i < users.length - 1; i++) {
    for (var j = i+1; j < users.length; j ++) {
      argumentsArr.push([users[i], users[j]]);
      console.log(users[i], users[j]);
    }
  }
  console.log("All the stuff: ", argumentsArr.length);
  inner(0);
});
  var inner = function(userPair) {
    // console.log("jumped into inner compare function", users[userOne], users[userTwo]);
    db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res){
      if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
      userOneDislikes = res.data;
      // console.log("typeof userOneDislikes: ", typeof userOneDislikes);
      
      db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res){
        if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
        userTwoDislikes = res.data;
        // console.log("typeof userTwoDislikes: ", typeof userTwoDislikes);

        db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
          if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
          userOneLikes = res.data;
          // console.log("typeof userOnelikes: ", typeof userOneLikes);

          db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
            if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
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


            db.cypherQuery("MATCH (u1:User {username:'" + argumentsArr[userPair][0] + "'}), (u2:User {username:'" + argumentsArr[userPair][1] + "'}) MERGE (u1)-[:SIMILARITY {score: '" + similarityIndex + "'}]->(u2)", function(err, res){
              if (err) { console.log (err); }
              console.log("Connected: ", argumentsArr[userPair][0]," and ", argumentsArr[userPair][1]);
              if (userPair + 1 < argumentsArr.length) {
                inner(userPair + 1);
              } else {
                console.log("WE ALL DONE WOOOSAOJASDJODSAJOADS");
              }
            });
          });
        });
      });
    });
  };

};

compare();


function makeUserSimalarities () {
  
  console.log("Starting Function");
  db.cypherQuery("MATCH (u:User) return u.username", function(err, res){
    users = res.data; 
    console.log("Got Users Back");
    // console.log("USERS: ", users[0]);
    // console.log("USERS TYPE: ",typeof users[0]);
    for (var i = 0; i < users.length - 1; i ++) {
      console.log("Starting User: ", i);
      // for (var j = i + 1; j < 80; j++) {
      j = i + 1;
      console.log("J: ",j);
      console.log(users.length);
      while(j < users.length){
        // console.log("Calling compare on 1: ", users[i], "2: ", users[j]);
        compare(users[i], users[j], iterate);
        j++;
      }  
      // }
    }
  });  
}
// makeUserSimalarities();




// compare('Laverne2','Lynell2');



