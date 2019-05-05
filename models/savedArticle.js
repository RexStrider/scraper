const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    }
});

const SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);
module.exports = SavedArticle;