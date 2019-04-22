const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
    
      summary: {
         type: String
      },
      
      href: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
      }
});

const SavedArticle = mongoose.model("SavedArticle", ArticleSchema);
module.exports = SavedArticle;