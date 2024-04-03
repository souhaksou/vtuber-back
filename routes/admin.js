const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
// const { verifyToken } = require('../middleware/verifyHandler');
const { getAccount, createAccount, editAccount, deleteAccount, login } = require('../controllers/admin/account');
const { getBanner, createBanner, editBanner, deleteBanner } = require('../controllers/admin/banner');
const { getTag, createTag, editTag, deleteTag } = require('../controllers/admin/tag');
const { getCategory, createCategory, editCategory, deleteCategory } = require('../controllers/admin/category');
const { getSubcategory, createSubcategory, editSubcategory, deleteSubcategory } = require('../controllers/admin/subcategory');

// 登入
router.post('/login', login);

// 帳號
router.get('/account', getAccount);
router.post('/account', createAccount);
router.put('/account', editAccount)
router.delete('/account', deleteAccount);

// banner
router.get('/banner', getBanner);
router.post('/banner', createBanner);
router.put('/banner', editBanner);
router.delete('/banner', deleteBanner);

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

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;