var db = require("../server/db/db.js")

//SCRIPT TO ENTER create 50 USERS and have them like 50 random episodes

var names = [
    {firstname: "Laverne2", email:"test1@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lynell2", email:"test2@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Neda2",email:"test3@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Laurette2",email:"test4@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Eliz2",email:"test5@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Kristian2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Tenesha2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lora2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Chloe2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jonna2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Mark2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jovita2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Ashanti2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lenora2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Tamie2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Deshawn2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Joseph2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Mireille2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Shaunda2",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Kristofer",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Winford",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lina",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Paige",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Elenor",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Nilsa",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jerold",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Suzann",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Dorotha",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Kristopher",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Ozell",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Estell",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Dario",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Marguerita",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Camie",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Shawanna",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Monica",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Tandy",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Johnathan",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Ned",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Vinita",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Stasia",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jacquetta",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Consuela",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Palmira",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Micaela",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Chantel",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Ann",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Loris",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Perry",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Marlen",email:"test@gmail.com", lastname:"lolzer", password:"coffee"}
    ];


var add50Users = function(){

    var episodes;
    var users;

    db.cypherQuery("Match (e:Episode) return e", function(err, res){
        episodes = res.data;
        console.log(episodes)
    });
    for(var i=0; i<names.length; i++){
        db.cypherQuery("Merge (n:User {firstname:{firstname},lastname:{lastname},username:{firstname},email:{email},password:{password}}) return n", names[i], function(err, users){
            if(err){
                console.log("ERROR: ", err)
                //res.sendStatus(404);
            } else{
                //res.sendStatus(200);
                console.log("success added user")
            }
        });
    }
    setTimeout(function(){
        db.cypherQuery("Match (u:User) return u", function(err, res){
            users = res.data;
            console.log(">>>>> GETTING USERS")
        });
    }, 4000)

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    setTimeout(function(){
        for(var i=0; i<users.length; i++){
            for(var j=0; j<50; j++){
                var rand = getRandomInt(0, episodes.length)
                db.cypherQuery("MATCH (u:User {username:'"+users[i].username+"'}),(e:Episode {title:'"+episodes[rand].title+"'}) MERGE (u)-[:HAS_LIKED]->(e)", function(err, query){
                    if(err){
                        console.log("ERR", err)
                    } else{
                        console.log("success linked")
                    }
                });
            }
        }
    }, 120000)
}

var dislike50Stuff = function(){
    var episodes;
    var users;

    db.cypherQuery("Match (e:Episode) return e", function(err, res){
        episodes = res.data;
        console.log(episodes)
    });
    //for(var i=0; i<names.length; i++){
    //    db.cypherQuery("Merge (n:User {firstname:{firstname},lastname:{lastname},username:{firstname},email:{email},password:{password}}) return n", names[i], function(err, users){
    //        if(err){
    //            console.log("ERROR: ", err)
    //            //res.sendStatus(404);
    //        } else{
    //            //res.sendStatus(200);
    //            console.log("success added user")
    //        }
    //    });
    //}
    setTimeout(function(){
        db.cypherQuery("Match (u:User) return u", function(err, res){
            users = res.data;
            console.log(">>>>> GETTING USERS")
        });
    }, 2000)

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    setTimeout(function(){
        for(var i=0; i<users.length; i++){
            for(var j=0; j<50; j++){
                var rand = getRandomInt(0, episodes.length)
                db.cypherQuery("MATCH (u:User {username:'"+users[i].username+"'}),(e:Episode {title:'"+episodes[rand].title+"'}) MERGE (e)<-[:HAS_DISLIKED]-(u) MERGE (u)-[:HAS_DISLIKED]-(e)", function(err, query){
                    if(err){
                        console.log("ERR", err)
                    } else{
                        console.log("success linked new dislike")
                    }
                });
                db.cypherQuery("MATCH (u:User {username:'"+users[i].username+"'}),(e:Episode {title:'"+episodes[rand].title+"'}) MATCH (u)-[rel:HAS_LIKED]-(e) DELETE rel", function(err, query){
                    if(err){
                        console.log("ERR", err)
                    } else{
                        console.log("success delted old")
                    }
                })
            }
        }
    }, 120000)
}


//add50Users()
//dislike50Stuff()


