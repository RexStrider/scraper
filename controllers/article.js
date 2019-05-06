const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const db = require('../models');

exports.scrapeArticles = async function(req, res) {
    try {
      let response = await axios.get('https://www.nytimes.com/section/us')
      let $ = cheerio.load(response.data)
      let element = $(`#stream-panel > div > ol > li`)
  
      for(let i=1; i <= element.length; i++) {
        let href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr('href')
        let title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text()
        let summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text()
        let article = new db.Article({
          title: title,
          summary: summary,
          href: href
        });
        await article.save();
      }
      res.render('scraped', {message: "Articles have been scraped"});
    } catch(error) {
      res.render('error', {message: "I'm sorry, an error has occurred. We tried to scrape the articles and failed. This usually occurs when one of the articles getting scrapped has already been saved to the database. I Recommend checking the New York Times articles link below.", error} );
    }
}

exports.getArticles = async function(req, res) {
  try {
    const articles = await db.Article.find({})
                                     .populate("notes");
    res.render('index', {articles});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred. We could not retrieve any articles. Try navigating to the home page and clicking the NYT Scraper link.", error} );
  }
}

exports.saveArticle = async function(req, res) {
  try {
    const article = await db.Article.findOne({_id: req.params.id});
    // updating saved article model
    const savedArticle  = new db.SavedArticle({
      _id: article._id,
      title: article.title
    });
    await savedArticle.save();
    res.render("saved", {message: "Article was successfully saved", savedArticle});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred. We could not save your article.", error} );
  }
}

exports.getSavedArticles = async function(req, res) {
  try {
    const saved = await db.SavedArticle.find({});
    const id_ary = saved.map(el => new mongoose.Types.ObjectId(el._id));
    const articles = await db.Article.find({ _id: {$in: id_ary} })
                                     .populate("notes");
    res.render('savedarticles', {articles});
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred. We could not retrieve your saved articles.", error} );
  }
}

exports.saveComment = async function(req, res) {
  try {
    // create note
    const note = await db.Note.create(req.body);
    // find article
    const article = await db.Article.findOne({ _id: req.params.id });
    // push note to article
    article.notes.push(note);
    // save article
    await article.save();
    // send article with note to web browser
    res.render('comment', { message: "Your comment has been saved",
                            comment: note.comment,
                            author: note.author,
                            title: article.title });
  }
  catch (error) {
    res.render('error', {message: "I'm sorry, an error has occurred. We could not save your comment on the article.", error} );
  }
}