var Promise = require("bluebird");
var db = require("../server/db/db.js");
var _ = require('lodash');
var users;



var compare = function(userOne, userTwo,callback) {
var hash = {};
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
    userOneLikes = hash[argumentsArr[userPair][0]+"likes"];
    userOneDislikes = hash[argumentsArr[userPair][0]+"dislikes"];
    userTwoLikes = hash[argumentsArr[userPair][1]+"likes"];
    userTwoDislikes = hash[argumentsArr[userPair][1]+"dislikes"];

    if (hash[argumentsArr[userPair][0]+"dislikes"] && hash[argumentsArr[userPair][0]+"likes"] && hash[argumentsArr[userPair][1]+"dislikes"] && hash[argumentsArr[userPair][1]+"likes"]){
      console.log("NEW USERS");
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
    } else if (hash[argumentsArr[userPair][0]+"dislikes"] && hash[argumentsArr[userPair][0]+"likes"]) {
      console.log("ONE NEW USER");
      db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res) {
        if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
        userTwoDislikes = res.data;
        hash[argumentsArr[userPair][1]+"dislikes"] = res.data;
        // console.log("typeof userOneDislikes: ", typeof userOneDislikes);
        
        db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
          if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
          userTwoLikes = res.data;
          hash[argumentsArr[userPair][1]+"likes"] = res.data;
          // console.log("typeof userTwoDislikes: ", typeof userTwoDislikes);
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
    } else if (hash[argumentsArr[userPair][1]+"dislikes"] && hash[argumentsArr[userPair][1]+"likes"]) {
      console.log("ONE NEW USER");
      db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res) {
        if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
        userOneDislikes = res.data;
        hash[argumentsArr[userPair][0]+"dislikes"] = res.data;
        // console.log("typeof userOneDislikes: ", typeof userOneDislikes);
        
        db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
          if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
          userOneLikes = res.data;
          hash[argumentsArr[userPair][0]+"likes"] = res.data;
          // console.log("typeof userTwoDislikes: ", typeof userTwoDislikes);
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
    } else {
      console.log("BOTH OLD USERS");
      db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res) {
        if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
        userOneDislikes = res.data;
        hash[argumentsArr[userPair][0]+"dislikes"] = res.data;
        // console.log("typeof userOneDislikes: ", typeof userOneDislikes);
        
        db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][0] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
          if (err) {console.log("Error: with ",argumentsArr[userPair][0]," ", err);}
          userOneLikes = res.data;
          hash[argumentsArr[userPair][0]+"likes"] = res.data;
          // console.log("typeof userTwoDislikes: ", typeof userTwoDislikes);

          db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_DISLIKED]-(e:Episode) return e.title", function(err, res){
            if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
            userTwoDislikes = res.data;
            hash[argumentsArr[userPair][1]+"dislikes"] = res.data;
            // console.log("typeof userOnelikes: ", typeof userOneLikes);

            db.cypherQuery("MATCH (u:User {username:'" + argumentsArr[userPair][1] + "'})-[r:HAS_LIKED]-(e:Episode) return e.title", function(err, res){
              if (err) {console.log("Error: with ",argumentsArr[userPair][1]," ", err);}
              userTwoLikes = res.data;
              hash[argumentsArr[userPair][1]+"likes"] = res.data;
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

    }
  };
};

compare();



// if user one is notstored
  // run async stuff for user one
  // run function B
// else if user one is stored
  // just access the data from the hash
  // run function B









// compare('Laverne2','Lynell2');



