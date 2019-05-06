var express = require('express');
var router = express.Router();
var articleController = require('../controllers/article');

/* GET Routes */
router.get('/', articleController.getArticles);
router.get('/create', articleController.scrapeArticles);
router.get('/save/:id', articleController.saveArticle);
router.get('/save', articleController.getSavedArticles);

/* POST Route */
router.post('/save/comment/:id', articleController.saveComment);

module.exports = router;
