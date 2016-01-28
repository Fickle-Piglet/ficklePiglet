var resourceController = require("../controllers/resourceController");
var loginController = require("../../server/controllers/loginController");

module.exports = function(app, express){

    //Insert Resource into Database
    app.post("/insert", resourceController.insertResource);

    //GetResource
    app.post('/getResource', resourceController.getResource);

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