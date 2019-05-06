const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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
    },

    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ]
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;