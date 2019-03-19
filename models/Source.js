var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SourceSchema = new Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    lastScraped: {
        type: Date
    },
    articlesScraped: {
        type: Array
    },
    totalAtricles: {
        type: Array
    }

});

var Source = mongoose.model("Source", SourceSchema);

module.exports = Source;