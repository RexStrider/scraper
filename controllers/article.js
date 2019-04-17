const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/article");

async function addArticle(req, res) {
    const article = new Article({title: "nyt", href: "http://nyt.com"});
    try {
        await article.save();
        res.json(article);
    }
    catch (e) {
        res.json(e);
    }
}

async function scrapeArticles(req, res) {
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

module.exports = {
    addArticle,
    scrapeArticles
}