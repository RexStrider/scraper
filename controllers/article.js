const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Article = require("../models/article");
const SavedArticle = require("../models/savedArticle");

exports.scrapeArticles = async function(req, res) {
    try {
      let response = await axios.get('https://www.nytimes.com/section/us')
      let $ = cheerio.load(response.data)
      let element = $(`#stream-panel > div > ol > li`)
  
      for(let i=1; i <= element.length; i++) {
        let href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr('href')
        let title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text()
        let summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text()
        let article = new Article({
          title: title,
          summary: summary,
          href: href
        });
        await article.save();
      }
      res.render('scraped', {message: "Articles have been scraped"});
    } catch(error) {
      res.render('error', {message: "I'm sorry, an error has occurred", error} );
    }
}

exports.getArticles = async function(req, res) {
  try {
    const articles = await Article.find({});
    console.log("articles retrieved");
    res.render('index', {articles});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred", error} );
  }
}

exports.saveArticle = async function(req, res) {
  try {
    const article = await Article.findOne({_id: req.params.id});
    // updating saved article model
    const savedArticle  = new SavedArticle({
      _id: article._id,
      title: article.title
    });
    await savedArticle.save();
    res.render("saved", {message: "Article was successfully saved", savedArticle});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred", error} );
  }
}

exports.getSavedArticles = async function(req, res) {
  try {
    const saved = await SavedArticle.find({});
    const id_ary = saved.map(el => new mongoose.Types.ObjectId(el._id));
    const articles = await Article.find({ _id: {$in: id_ary} });
    res.render('savedarticles', {articles});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred", error} );
  }
}

exports.saveComment = async function(req, res) {
  try {

  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred", error} );
  }
}