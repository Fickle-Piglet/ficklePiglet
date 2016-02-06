var resourceController = require("../controllers/resourceController");
var loginController = require("../../server/controllers/loginController");
var userResourceController = require("../../server/controllers/userResourceController");
var userController = require("../../server/controllers/userController");
var elastic = require("../../server/controllers/esearch");


module.exports = function(app, express){

    //Insert Resource into Database
    app.post("/insert", resourceController.insertResource);
    
    /* GET suggestions */
    app.get('/suggest/:input', function (req, res, next) {  
      console.log("hit this route",req.params.input)
      elastic.getSuggestions(req.params.input).then(function (result) { res.json(result) });
    });

    /* POST document to be indexed */
    app.post('/create', function (req, res, next) {  
      elastic.addDocument(req.body).then(function (result) { res.json(result) });
    });



    //Insert Episode into Database
    app.post("/insertEp", resourceController.insertEpisode);

    //Edit episodes
    app.post("/editEp", resourceController.editEpisode);

    //GetResource
    //EX:
    //   [ { name: '60-Second Space',
    //   url: 'https://itunes.apple.com/us/podcast/60-second-space/id434439476?mt=2&uo=4',
    //   _id: 4091 },
    //   { name: 'Chalk Talk Physics Podcast',
    //   url: 'https://itunes.apple.com/us/podcast/chalk-talk-physics-podcast/id262782016?mt=2&uo=4',
    //   _id: 4054 }]
    app.post('/getResource', resourceController.getResource);
    app.post('/likeResource', userResourceController.likeResource);
    app.post('/dislikeResource', userResourceController.dislikeResource);
    app.post('/resourceHistory', userResourceController.markAsSeen);
    
    app.post('/removeRelationship', userResourceController.removeRelationship);
    //Tags
    //Returns Array of Tag objects 
    //EX: [  { name: 'Business News', _id: 4030 },
    // { name: 'Philosophy', _id: 4033 },
    // { name: 'Judaism', _id: 4034 },]
    app.get('/tags', resourceController.getTags);
    app.get('/user/:user', userController.getUser);
    app.get('/userlike/:user', userController.getLikes);
    app.get('/userDislike/:user', userController.getDislikes);
    app.post('/getRec', resourceController.getRec);

    //Signup/Signin Stuff
    app.post("/signin", loginController.signin);
    app.post("/signup", loginController.signup);
    app.post("/logout", loginController.logout);
};