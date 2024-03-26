const express = require('express');
const router = express.Router();
const { ErrorHandler } = require('../middleware/errorHandler');
const { getAllAccounts } = require('../controllers/account');
// const { verifyToken, checkPermission } = require('../middleware/verify-handler');


// 登入
// router.post('/login', get);

//帳號
router.get('/account', getAllAccounts);

// 錯誤處理
// router.use('/', ErrorHandler);

module.exports = router;