var db = require("../../server/db/db.js");

var request = require("request");
var _ = require("lodash");


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
        var pubDate = req.body.pubDate
        var title = req.body.title.replace(/'/g, "*");
        var link = req.body.link
        var resource = req.body.feed.title.replace(/'/g, "*")
        var feed = req.body.feed
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
                db.cypherQuery("MATCH (resources:Resource { name: {text}})-[:TAGGED]-(t:Tag) WHERE not t.name = 'Podcasts' return t.name", userPreferences.resource, function(err, result) {
                    //keywords is an array of tags
                    if (err) {
                        throw err;
                    }
                    console.log("GETTING THE TAGS FOR SHOW",result.data)
                    userPreferences.keywords = result.data;
                    db.cypherQuery("MATCH  (u:User {username:{username}})-[:HAS_SEEN]->(eps:Episode) WITH collect(distinct eps) as seenepisodes MATCH (e:Episode)--(resources:Resource)--(t:Tag) WHERE t.name IN {keywords} AND NOT e IN seenepisodes WITH resources,e, rand() AS  number return e.title as episodeTitle ORDER BY number limit 10;",
                        userPreferences,
                        function(err, query) {
                          if (err) { console.log(err) }
                          userPreferences.titles = query.data, 'title';
                          db.cypherQuery("Match (u:User {username:{username}})-[s:SIMILARITY]-(m:User)-[r]-(e:Episode) where not u.username=m.username and e.title in {titles} WITH e as eps, (sum(case when type(r)='HAS_LIKED' then  toFloat(s.score) END) - sum(case when type(r)='HAS_DISLIKED' then toFloat(s.score) END))/(count(case when type(r)='HAS_LIKED' then m.username END) + count(case when type(r)='HAS_DISLIKED' then m.username END)) as rank MATCH (eps)--(r:Resource) return r.name,r.thumbnail,eps.title, eps.link order by rank DESC limit 5;",userPreferences,
                              function(err, query) {
                                res.send(query.data);
                                console.log("<<<<<RANKED SHOWS",query.data)
                          });   
                    });
                });
            } else {
                console.log("NAME OF TAG: ", userPreferences.resource.text);
                userPreferences.keywords = [userPreferences.resource.text];
                db.cypherQuery("MATCH  (u:User {username:{username}})-[:HAS_SEEN]->(eps:Episode) WITH collect(distinct eps) as seenepisodes MATCH (e:Episode)--(resources:Resource)--(t:Tag) WHERE t.name IN {keywords} AND NOT e IN seenepisodes WITH resources,e, rand() AS  number return e.title as episodetitle ORDER BY number limit 10;",
                    userPreferences,
                    function(err, query) {
                        if (err) { console.log(err) }
                        userPreferences.titles = query.data, 'title';
                        db.cypherQuery("Match (u:User {username:{username}})-[s:SIMILARITY]-(m:User)-[r]-(e:Episode) where not u.username=m.username and e.title in {titles} WITH e as eps, (sum(case when type(r)='HAS_LIKED' then  toFloat(s.score) END) - sum(case when type(r)='HAS_DISLIKED' then toFloat(s.score) END))/(count(case when type(r)='HAS_LIKED' then m.username END) + count(case when type(r)='HAS_DISLIKED' then m.username END)) as rank MATCH (eps)--(r:Resource) return r.name,r.thumbnail,eps.title, eps.link order by rank DESC limit 5;",userPreferences,
                            function(err, query) {
                              res.send(query.data);
                              console.log("<<<<<RANKED SHOWS",query.data)
                        });  
                });
            }
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
