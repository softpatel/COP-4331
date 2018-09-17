var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Nil is the cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
// One is for testing and local use, the other is production
// DON'T MESS WITH PROD DB WHILE TESTING
//const url = 'mongodb://localhost:27017';
const url = "mongodb://nil:nillin15@ds159772.mlab.com:59772/studyapp";

//mongoose.connect("mongodb://localhost/StudyApp");
mongoose.connect(url);

// Database Name
//const dbName = 'StudyApp';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  //const db = client.db(dbName);
 
  client.close();
});

// Sets up User strategy (plain username and password)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
//   ROUTES
// ===========

// Homepage - needs to be updated
app.get("/", function(req, res) {
  res.render("home");
});

//handle user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});

// login page
app.get("/login", function(req, res){
   res.render("login"); 
});

// register page
app.get("/register", function(req, res){
   res.render("register"); 
});

app.get("/menu", function(req,res) {
    res.send("This is where the menu will be.");
});

app.get("/timer", function(req,res){
    res.render("timer");
})

app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret"); 
});

// Middleware function that verifies  a user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(port, function() {
  console.log("Study app has been started!");
});