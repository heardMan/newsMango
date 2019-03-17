var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    body: {
        type: String,
        required: "Body content is required"

    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;