var express = require('express');
var router = express.Router();
var articleController = require('../controllers/article');

/* GET users listing. */
router.get('/', articleController.getArticles);
router.get('/create', articleController.scrapeArticles);
router.get('/save/:id', articleController.saveArticle);

module.exports = router;
