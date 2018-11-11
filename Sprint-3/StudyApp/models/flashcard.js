var mongoose = require("mongoose");

var FlashcardSchema = new mongoose.Schema({
    title: String,
    front: String,
    back: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Flashcard", FlashcardSchema);