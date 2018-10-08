var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    Note = require("./models/note"),
    LocalStrategy = require("passport-local");
    //passportLocalMongoose = require("passport-local-mongoose");
    
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
//const url = 'mongodb://localhost:27017';
const url = "mongodb://nil:nillin15@ds159772.mlab.com:59772/studyapp";

//mongoose.connect("mongodb://localhost/StudyApp");
mongoose.connect(url);

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
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

// Handle user account creation  -- Change redirect to menu once menu is done
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/menu");
        });
    });
});

// Create new note
app.post("/notes", isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    // Find user and add note to their notes array
    User.findById(author.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/notes");
       } else {
            Note.create(new Note({content: req.body.content, author: author}), function(error, newNote) {
                if(error) {
                    console.log("Error creating the note.");
                } else {
                    user.notes.push(newNote);
                    user.save();
                    res.redirect("/menu");
/*
                    This code will return the contents of each note in a user's array

                    user.notes.forEach(function(note) {
                        Note.findById(note, function(err, foundNote) {
                            if(err) {
                                console.log("dang!");
                            } else {
                                console.log(foundNote.content);
                            }   
                        });
                    });
*/                  
                }
            });
       }
    });
});

// login page
app.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic -- Change successRedirect to menu once menu is done
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/menu",
        failureRedirect: "/login"
    }), function(req, res){
});

// register page
app.get("/register", function(req, res){
   res.render("register");
});

// Show all user's notes and have buttons for timer, create note...
app.get("/menu", isLoggedIn, function(req,res) {
    //console.log(req.user);
    res.render("menu", {user: req.user});
});

app.get("/timer", function(req,res){
    res.render("timer");
});

app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret"); 
});

app.get("/notes", function(req, res) {
   res.render("notes"); 
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