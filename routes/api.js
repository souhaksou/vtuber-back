const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/errorHandler');
// const { verifyToken } = require('../middleware/verifyHandler');
const { getAccount, createAccount, editAccount, deleteAccount, login } = require('../controllers/account');
const { getBanner, createBanner, editBanner, deleteBanner } = require('../controllers/home');

// 登入
router.post('/login', login);

// 帳號
router.get('/account', getAccount);
router.post('/account', createAccount);
router.put('/account', editAccount)
router.delete('/account', deleteAccount);

// 首頁
router.get('/banner', getBanner);
router.post('/banner', createBanner);
router.put('/banner', editBanner);
router.delete('/banner', deleteBanner);

// 測試

// 錯誤處理
router.use('/', errorHandler);

module.exports = router;