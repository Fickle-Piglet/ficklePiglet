var db = require("../server/db/db.js")

var names = [
    {firstname: "Laverne", email:"test1@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lynell", email:"test2@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Neda",email:"test3@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Laurette",email:"test4@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Eliz",email:"test5@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Kristian",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Tenesha",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lora",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Chloe",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jonna",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Mark",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Jovita",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Ashanti",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Lenora",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Tamie",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Deshawn",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Joseph",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Mireille",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
    {firstname:"Shaunda",email:"test@gmail.com", lastname:"lolzer", password:"coffee"},
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
        episodes = res;
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
            users = res;
        });
    }, 10000)

    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };


    setTimeout(function(){
        for(var i=0; i<users.length; i++){
            console.log("")
            for(var j=0; j<50; j++){
                var userLikes = {username: users[i].username, ResourceName: episodes[getRandomInt()].title}
                db.cypherQuery("MATCH (u:User {username:{username}}),(e:Episode {title:{ResourceName}}) MERGE (u)-[:HAS_LIKED]->(e)", userLikes, function(err, query){
                    if(err){
                        //res.sendStatus(404);
                        console.log("ERR", err)
                    } else{
                        //res.sendStatus(200);
                        console.log("success linked")
                    }
                });
            }

        }
    }, 50000)
}

add50Users();