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
      var response = await axios.get('https://www.nytimes.com/section/us')
      var $ = cheerio.load(response.data)
      var element = $(`#stream-panel > div > ol > li`)
  
      for(let i=1; i <= element.length; i++) {
        var href = $(`#stream-panel > div > ol > li:nth-child(${i}) a`).attr('href')
        var title = $(`#stream-panel > div > ol > li:nth-child(${i}) h2`).text()
        var summary = $(`#stream-panel > div > ol > li:nth-child(${i}) p`).text()
        var article = new Article({
          title: title, 
          summary: summary,
          href: href
        })
        await article.save()
        res.send('got it')
      }        
    } catch(err) {
      res.send( err )
    }
}

module.exports = {
    addArticle,
    scrapeArticles
}