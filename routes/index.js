var express = require('express');
var router = express.Router();

var articleController = require('../controllers/article');

/* GET home page. */
router.get('/', articleController.getArticles);

module.exports = router;
