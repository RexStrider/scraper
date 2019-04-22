const axios = require("axios");
const cheerio = require("cheerio");
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
      res.send('got it');
    } catch(err) {
      console.log("ruh roh... we got a problem...");
      res.send( `error: ${err}` );
    }
}

exports.getArticles = async function(req, res) {
  try {
    const articles = await Article.find({});
    console.log("articles retrieved");
    res.render('index', {articles});
  }
  catch (e) {
    console.log("an error occurred");
    res.json(`error: ${e}`);
  }
}

exports.saveArticle = async function(req, res) {
  try {
    var article = await Article.findOne({_id: req.params.id});

    // var title = article.title;
    
    const savedArticle  = new SavedArticle({
      title: article.title,
      summary: article.summary,
      href: article.href
    });

    await savedArticle.save();
    console.log("article saved");
    res.json({message: "OK", savedArticle});
  }
  catch (e) {
    console.log(`error: ${e}`);
    res.json({error: `Uh Oh... we could not save your article. Have you already saved this article? "${article.title}"`});
  }
}