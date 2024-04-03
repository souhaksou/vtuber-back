const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
const { getCategory } = require('../controllers/api/article');

// // 登入
// router.post('/login', login);

// // 帳號
// router.get('/account', getAccount);
// router.post('/account', createAccount);
// router.put('/account', editAccount)
// router.delete('/account', deleteAccount);

// // 首頁
// router.get('/banner', getBanner);
// router.post('/banner', createBanner);
// router.put('/banner', editBanner);
// router.delete('/banner', deleteBanner);

// 文章
router.get('/category', getCategory)
// router.get('/tag', getTag);
// router.post('/tag', createTag);
// router.put('/tag', editTag);
// router.delete('/tag', deleteTag);

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;