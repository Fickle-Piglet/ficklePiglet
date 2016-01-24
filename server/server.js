var express = require('express');
var app = express();
var port = 5050;


app.listen(port, function(){
    console.log('Listening on port '+ port);
});

module.exports = app;