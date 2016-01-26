var resourceController = require("../controllers/resourceController")
var loginController = require("../../server/controllers/loginController")

module.exports = function(app, express){

    //Insert Resource into Database
    app.post("/insert", resourceController.insertResource)

    //GetResource
    app.get('/getResource', resourceController.getResource)

    //Signup/Signin Stuff
    app.post("/signin", loginController.signin)
    app.post("/signup", loginController.signup)
    app.post("/logout", loginController.logout)
}