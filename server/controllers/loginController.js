module.exports = {
    signin : function(req, res){
        //TODO: Write signin query

    },
    signup: function(req, res){
        //TODO: Write signup query
        console.log("Got request", req.body)
        res.send("what up")
    },
    logout: function(req, res){
        //TODO: Write logout function
    }
};