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

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;