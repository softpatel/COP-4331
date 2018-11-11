var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    Note = require("./models/note"),
    Flashcard = require("./models/flashcard"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    middleware = require("./middleware");
    
var port = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
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
const url = "mongodb://nil:nillin15@ds159772.mlab.com:59772/studyapp";

mongoose.connect(url);

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  client.close();
});

// Sets up User strategy (plain username and password)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
//   ROUTES
// ===========

// Homepage
app.get("/", function(req, res) {
  res.render("login");
});

app.get("/timer", middleware.isLoggedIn, function(req,res){
    res.render("timer", {user: req.user});
});

// User Account Routes

// Handle user account creation
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('register');
        }
        
        passport.authenticate("local")(req, res, function(){
           res.redirect("/menu");
        });
    });
});


// login page - needed now that its homepage too?
app.get("/login", function(req, res){
   res.redirect("/"); 
});

//handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/menu",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/login");
});

// register page
app.get("/register", function(req, res){
   res.render("register");
});

// Notes routes


// Edit flashcard page
app.get("/flashcards/:flashcardID/edit", middleware.isLoggedIn, function(req, res) {
   Flashcard.findById(req.params.flashcardID, function(err, foundFlashcard) {
       if(err) {
           console.log(err);
       } else {
          res.render("editFC", {flashcard: foundFlashcard, user: req.user});
       }
   });
});

// Edit Note page
app.get("/notes/:noteID/edit", middleware.checkUserNote, function(req, res) {
   Note.findById(req.params.noteID, function(err, foundNote) {
       if(err) {
           console.log(err);
       } else {
           res.render("edit", {note: foundNote, user: req.user});
       }
   });
});

// Delete a flashcard 
app.delete("/deleteCard/:flashcardID", function(req, res) {
   Flashcard.findByIdAndRemove(req.params.flashcardID, function(err){
        if(err){
            console.log("Error deleting a flashcard!");
        } else {
            res.redirect("/flashcards");
        }
    });
});

// Delete a note 
app.delete("/:noteID", function(req, res) {
   Note.findByIdAndRemove(req.params.noteID, function(err){
        if(err){
            console.log("Error deleting a note!");
        } else {
            res.redirect("/menu");
        }
    });
});


// Update a note in the database
app.put("/notes/:noteID", function(req,res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var title = req.body.title;
    var updatedNote = {content: req.body.content, author: author, title: title};

    // Find user and add note to their notes array
    Note.findByIdAndUpdate(req.params.noteID, updatedNote,function(err, note){
       if(err){
           console.log(err);
           res.redirect("/menu");
       } else {
           res.redirect("/menu");
       }
    });
});

// Update a flashcard in the database
app.put("/flashcards/:flashcardID", function(req,res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var title = req.body.title;
    var front = req.body.front;
    var back = req.body.back;
    var updatedFlashcard = {title: title, front: front, back: back, author: author };


    // Find user and add flashcard to their notes array
    Flashcard.findByIdAndUpdate(req.params.flashcardID, updatedFlashcard,function(err, user){
       if(err){
           console.log(err);
           res.redirect("/menu");
       } else {
           res.redirect("/flashcards");
       }
    });
});

 // Create new note
app.post("/notes", middleware.isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var title = req.body.title;

    // Find user and add note to their notes array
    User.findById(author.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/createNote");
       } else {
            Note.create(new Note({content: req.body.content, author: author, title: title}), function(error, newNote) {
                if(error) {
                    console.log("Error creating the note.");
                } else {
                    user.notes.push(newNote);
                    user.save();
                    res.redirect("/menu");
                }
            });
       }
    });
});

// Create new flashcard
app.post("/flashcards", middleware.isLoggedIn, function(req, res) {
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var title = req.body.title;
    var front = req.body.front;
    var back = req.body.back;

    // Find user and add note to their notes array
    User.findById(author.id, function(err, user){
       if(err){
           console.log(err);
           res.redirect("/createFlashcard");
       } else {
            Flashcard.create(new Flashcard({title: title, front: front, back: back, author: author }), function(error, newFlashcard) {
                if(error) {
                    console.log("Error creating the flashcard.");
                } else {
                    user.flashcards.push(newFlashcard);
                    user.save();
                    res.redirect("/flashcards");
                }
            });
       }
    });
});

// Note menu page
app.get("/menu", middleware.isLoggedIn, function(req,res) {
   
    Note.find({"author.id": req.user._id}, function(err, foundNotes) {
            if(err) {
                console.log("dang!");
            } else {
                res.render("menu", {user: req.user, notes: foundNotes});
            }   
    });
});

// Flashcard menu page
app.get("/flashcards", function(req, res) {
    Flashcard.find({"author.id": req.user._id}, function(err, foundFlashcards) {
        if(err) {
            console.log("dang!");
        } else {
            res.render("testFlashcardPage", {user: req.user, flashcards: foundFlashcards});
        }
    });
});

// Create note page
app.get("/notes", middleware.isLoggedIn, function(req, res) {
   res.render("createNote", {user: req.user}); 
});

// Create flashcard page
app.get("/flashcardsCreate", middleware.isLoggedIn, function(req, res) {
    res.render("createFlashcard", {user: req.user});
});


app.listen(port, function() {
  console.log("Study app has been started!");
});

module.exports = app;