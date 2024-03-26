const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "請輸入名稱"],
  },
  account: {
    type: String,
    required: [true, "請輸入帳號"],
  },
  password: {
    type: String,
    required: [true, "請輸入密碼"],
  },
});


const Account = mongoose.model('account', accountSchema);

module.exports = Account;