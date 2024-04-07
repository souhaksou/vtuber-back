const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
const { verifyToken } = require('../middleware/verifyHandler');
const { getAccount, createAccount, editAccount, deleteAccount, login } = require('../controllers/admin/account');
const { getBanner, createBanner, editBanner, deleteBanner } = require('../controllers/admin/banner');
const { getChart, createChart, editChart, deleteChart } = require('../controllers/admin/chart');
const { getFeatured, createFeatured, editFeatured, deleteFeatured } = require('../controllers/admin/featured');
const { getTag, createTag, editTag, deleteTag } = require('../controllers/admin/tag');
const { getCategory, createCategory, editCategory, deleteCategory } = require('../controllers/admin/category');
const { getSubcategory, createSubcategory, editSubcategory, deleteSubcategory } = require('../controllers/admin/subcategory');
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

//精選
router.get('/featured', verifyToken, getFeatured);
router.post('/featured', verifyToken, createFeatured);
router.put('/featured', verifyToken, editFeatured);
router.delete('/featured', verifyToken, deleteFeatured);

// tag
router.get('/tag', getTag);
router.post('/tag', createTag);
router.put('/tag', editTag);
router.delete('/tag', deleteTag);

// category
router.get('/category', getCategory);
router.post('/category', createCategory);
router.put('/category', editCategory);
router.delete('/category', deleteCategory);

// subcategory
router.get('/subcategory', getSubcategory);
router.post('/subcategory', createSubcategory);
router.put('/subcategory', editSubcategory);
router.delete('/subcategory', deleteSubcategory);

// 文章
router.get('/article', getArticle);
router.post('/article', createArticle);
router.put('/article', editArticle);
router.delete('/article', deleteArticle);

// seo
router.get('/seo', verifyToken, getSeo);
router.post('/seo', verifyToken, createSeo);
router.put('/seo', verifyToken, editSeo);
router.delete('/seo', verifyToken, deleteSeo);

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;