var db = require("../../server/db/db.js");
var request = require("request");


module.exports = {
    //Query to insert all Resources with accompanying Tags into the database
    insertResource: function(req, res) {
        var name = req.body.name.replace(/'/g, "*");
        var tags = req.body.genre
        var url = req.body.url
        var thumbnail = req.body.thumbnail
        var feedUrl = req.body.feedUrl
        var episodes = req.body.episodes
        db.cypherQuery("MERGE (r:Resource {name:'"+name+"', url:'"+url+"', thumbnail:'"+thumbnail+"', feedUrl:'"+feedUrl+"', episodes:'"+episodes+"'}) MERGE (t:Tag {name:'"+tags+"'}) MERGE (r:Resource {name:'"+name+"', url:'"+url+"', thumbnail:'"+thumbnail+"', feedUrl:'"+feedUrl+"'})-[:TAGGED]-(t:Tag {name:'"+tags+"'})", function(err, res){
        })
    },
    insertEpisode : function(req, res){
        //console.log(">>>>>>>>>>>>>>REQ", req.body)
        var pubDate = req.body.pubDate
        var title = req.body.title.replace(/'/g, "*");
        var link = req.body.link
        var resource = req.body.feed.title.replace(/'/g, "*")
        var feed = req.body.feed
        // TODO: Modify CypherQuery for inserting episode as a node into db
        //"MATCH (u:User {username:{username}}),(r:Resource {name:{ResourceName}}) MERGE (u)-[:HAS_LIKED]->(r)"
        console.log(">>>> $ $ $ $ $ Episode :"+title+", Resource:'"+resource+"' $ $ $ $ $ <<<<)")
        db.cypherQuery("MERGE (e:Episode {title:'"+title+"', link:'"+link+"', pubDate:'"+pubDate+"'})", function(err, res){
            if(err){
                console.log("* * * * * E R R O R * * * * *:", err)
            }
        })
        db.cypherQuery("Match (e:Episode {title:'"+title+"'}) Match (r:Resource {name:'"+resource+"'}) MERGE (e)-[:EPISODE_OF]->(r)", function(err, res){
            if(err){
                console.log("* * * * * E R R O R * * * * *:", err)
            }
        })
        res.send(200)
    },

    editEpisode: function(req, res) {

        var name = req.body.name;
        var episodes = JSON.stringify(req.body.episodes);
        episodes = episodes.replace(/"/g, "*");

        console.log(episodes);
        console.log(">>>>> MATCH (r:Resource {name:'" + name + "'} SET r.episodes ='" + episodes + "' RETURN r");
        db.cypherQuery("MATCH (r:Resource {name:'" + name + "'}) SET r.episodes ='" + episodes + "' RETURN r", function(err, res) {

        });
    },
    //Query to getgit
    getResource: function(req, res) {
        var userPreferences = req.body;
        console.log("User Preferences: ", userPreferences);
        if (Object.keys(userPreferences).length === 0) {
            res.sendStatus(404);
        } else {
            // Is it a tag or show? 
            if (userPreferences.resource.payload.url) {
                console.log("NAME OF SHOW: ", userPreferences.resource.text);
                db.cypherQuery("MATCH (resources:Resource { name: {text}})-[:TAGGED]-(t:Tag) return t.name", userPreferences.resource, function(err, result) {
                    //keywords is an array of tags
                    if (err) {
                        throw err;
                    }
                    userPreferences.keywords = result.data;
                    db.cypherQuery("MATCH  (u:User {username:{username}})-[:HAS_SEEN]->(r:Resource) WITH collect(distinct r) as seenresources MATCH (resources:Resource)-[:TAGGED]-(t:Tag) WHERE t.name IN {keywords} AND NOT resources IN seenresources return resources;",
                        userPreferences,
                        function(err, query) {
                            //Randomizer function
                            var getRandomInt = function(min, max) {
                                return Math.floor(Math.random() * (max - min)) + min;
                            };
                            var int = getRandomInt(0, query.data.length);
                            console.log("RESULTSSS>>>>>>>>>>>>>>>>>", query.data[int]);
                            res.send([query.data[int]]);
                        });
                });
            } else {
                console.log("NAME OF TAG: ", userPreferences.resource.text);
                userPreferences.keywords = [userPreferences.resource.text];
                db.cypherQuery("MATCH  (u:User {username:{username}})-[:HAS_SEEN]->(r:Resource) WITH collect(distinct r) as seenresources MATCH (resources:Resource)-[:TAGGED]-(t:Tag) WHERE t.name IN {keywords} AND NOT resources IN seenresources return resources;",
                    userPreferences,
                    function(err, query) {
                        //Randomizer function
                        var getRandomInt = function(min, max) {
                            return Math.floor(Math.random() * (max - min)) + min;
                        };
                        var int = getRandomInt(0, query.data.length);
                        console.log("RESULTSSS>>>>>>>>>>>>>>>>>", query.data[int]);
                        res.send([query.data[int]]);
                    });
            }
            //userPreferences.resource.isShow 
            // This finds all of the tags for a particular show;
        }
    },
    getTags: function(req, res) {
        db.cypherQuery("Match (n:Tag) Return n", function(err, response) {
            res.send(response.data);
        });
    },

    getRec: function(req, res) {
        var userInfo = req.body;
        console.log("userinfo",userInfo);
        db.cypherQuery("MATCH (u: User {username: {username}})-[:HAS_LIKED]->(r: Episode)<-[:HAS_LIKED]-(y: User)-[:HAS_LIKED]->(s: Episode) WHERE not(u = y) and not (u -- s) RETURN distinct s AS name;", userInfo, function(err, query) {
                if (err) {
                    throw err;
                }
                var getRandomInt = function(min, max) {
                    return Math.floor(Math.random() * (max - min)) + min;
                };
                var int = getRandomInt(0, query.data.length);
                console.log("getRec data",[query.data[int]]);
                res.send([query.data[int]]);
            });
    },
    getTags: function(req, res){
        db.cypherQuery("Match (n:Tag) Return n", function(err, response){
            res.send(response.data);
        });
    }


};
//Old RSS Stuff that used to be in getResource
// // console.log(">>>>>SINGLE QUERY DATA",[query.data[int]])
// // TODO: Request for rss feed api
// request({
//     method: "GET",
//     url: "http://rss2json.com/api.json?rss_url=" + query.data[int].feedUrl
// }, function(err, result, body){
//     //console.log("RES:", res)
//     //console.log(">>>>>>>Body", JSON.parse(body))
//     query.data[int].feed = JSON.parse(body).feed
//     query.data[int].episodes = JSON.parse(body).items
//     //TODO: Need to review redirect parser. Code for redirect url moved to redirectURL.js

//     res.send([query.data[int]])


// })

