var resourceController = require("../controllers/resourceController");
var loginController = require("../../server/controllers/loginController");
var userResourceController = require("../../server/controllers/userResourceController");

module.exports = function(app, express){

    //Insert Resource into Database
    app.post("/insert", resourceController.insertResource);

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

    //Tags
    //Returns Array of Tag objects 
    //EX: [  { name: 'Business News', _id: 4030 },
    // { name: 'Philosophy', _id: 4033 },
    // { name: 'Judaism', _id: 4034 },]
    app.get('/tags', resourceController.getTags);

    //Signup/Signin Stuff
    app.post("/signin", loginController.signin);
    app.post("/signup", loginController.signup);
    app.post("/logout", loginController.logout);
};