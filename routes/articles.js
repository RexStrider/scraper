var express = require('express');
var router = express.Router();
var articleController = require('../controllers/article');

/* GET users listing. */
router.get('/create', articleController.scrapeArticles);

module.exports = router;
