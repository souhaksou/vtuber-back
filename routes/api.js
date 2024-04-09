const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
const { getHome } = require('../controllers/api/home');
const { getFeatured } = require('../controllers/api/featured');
const { getArticle, getSlugArticle } = require('../controllers/api/article');
const { getChart } = require('../controllers/api/chart');

//首頁
// banner
router.get('/home', getHome);

// 文章
// 精選
router.get('/featured', getFeatured);
// articles
router.get('/article', getArticle);
router.post('/article', getSlugArticle);

// 圖表
router.get('/chart', getChart);

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;