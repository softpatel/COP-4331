var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   notes: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Note"
      }   
   ],
   flashcards: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Flashcard"
      }   
   ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);