const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
const { verifyToken } = require('../middleware/verifyHandler');
const { getAccount, createAccount, editAccount, deleteAccount, login } = require('../controllers/admin/account');
const { getBanner, createBanner, editBanner, deleteBanner } = require('../controllers/admin/banner');
const { getChart, createChart, editChart, deleteChart, getActiveChart } = require('../controllers/admin/chart');
const { getFeatured, createFeatured, editFeatured, deleteFeatured } = require('../controllers/admin/featured');
const { getTag, createTag, editTag, deleteTag } = require('../controllers/admin/tag');
const { getCategory, createCategory, editCategory, deleteCategory } = require('../controllers/admin/category');
const { getSubcategory, createSubcategory, editSubcategory, deleteSubcategory, getJoinCategory } = require('../controllers/admin/subcategory');
const { getArticle, createArticle, editArticle, deleteArticle } = require('../controllers/admin/article');
const { getSeo, createSeo, editSeo, deleteSeo } = require('../controllers/admin/seo');

// 登入
router.post('/login', login);

// 帳號
router.get('/account', verifyToken, getAccount);
router.post('/account', verifyToken, createAccount);
router.put('/account', verifyToken, editAccount)
router.delete('/account', verifyToken, deleteAccount);

// banner
router.get('/banner', verifyToken, getBanner);
router.post('/banner', verifyToken, createBanner);
router.put('/banner', verifyToken, editBanner);
router.delete('/banner', verifyToken, deleteBanner);

// 圖表
router.get('/chart', verifyToken, getChart);
router.post('/chart', verifyToken, createChart);
router.put('/chart', verifyToken, editChart);
router.delete('/chart', verifyToken, deleteChart);
router.get('/chart', verifyToken, getActiveChart);

//精選
router.get('/featured', verifyToken, getFeatured);
router.post('/featured', verifyToken, createFeatured);
router.put('/featured', verifyToken, editFeatured);
router.delete('/featured', verifyToken, deleteFeatured);

// tag
router.get('/tag', verifyToken, getTag);
router.post('/tag', verifyToken, createTag);
router.put('/tag', verifyToken, editTag);
router.delete('/tag', verifyToken, deleteTag);

// category
router.get('/category', verifyToken, getCategory);
router.post('/category', verifyToken, createCategory);
router.put('/category', verifyToken, editCategory);
router.delete('/category', verifyToken, deleteCategory);

// subcategory
router.get('/subcategory', verifyToken, getSubcategory);
router.post('/subcategory', verifyToken, createSubcategory);
router.put('/subcategory', verifyToken, editSubcategory);
router.delete('/subcategory', verifyToken, deleteSubcategory);

// 文章
router.get('/joincategory', verifyToken, getJoinCategory);
router.get('/article', verifyToken, getArticle);
router.post('/article', verifyToken, createArticle);
router.put('/article', verifyToken, editArticle);
router.delete('/article', verifyToken, deleteArticle);

// seo
router.get('/seo', verifyToken, getSeo);
router.post('/seo', verifyToken, createSeo);
router.put('/seo', verifyToken, editSeo);
router.delete('/seo', verifyToken, deleteSeo);

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;