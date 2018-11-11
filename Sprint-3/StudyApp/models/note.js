var mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    content: String,
    title: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Note", NoteSchema);