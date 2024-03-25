const express = require('express');
const router = express.Router();
const { get } = require('../controllers/home');
// const { verifyToken, checkPermission } = require('../middleware/verify-handler');
// const { ErrorHandler } = require('../middleware/error-handler');

// 登入頁
router.get('/home', get);

// 錯誤處理
router.use('/', ErrorHandler);

module.exports = router;