var entryController = require("../../server/controllers/entryController")

module.exports = function(app, express){
    app.post("/insert", entryController.insertResource)
}