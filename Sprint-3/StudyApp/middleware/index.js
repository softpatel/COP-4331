var User = require("../models/user");
var Note = require("../models/note");

module.exports = {
    // Verifies  a user is logged in
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    },
    checkUserNote: function(req, res, next){
        if(req.isAuthenticated()){
            Note.findById(req.params.noteID, function(err, note){
                if(err){
                    console.log("Note not found.");
                }
                if(note.author.id.equals(req.user._id)){
                    next();
                } else {
                    console.log("Only the owner of the note can do that!");
                    res.redirect("/menu");
                }
            });
        } else {
            res.redirect("/login");
        }
    }
};