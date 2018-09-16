var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path")

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname+'/public/home.html'));
});

app.get("/menu", function(req,res) {
    res.send("This is where the menu will be.");
});

app.get("/timer", function(req,res) {
    res.sendFile(path.join(__dirname+'/timer.html'));
});

app.listen(port, function() {
  console.log("Study app has been started!");
});
