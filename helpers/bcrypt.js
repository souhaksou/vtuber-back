const util = require('util');
const bcrypt = require('bcrypt');

// 將 bcrypt.hash 封裝成 Promise 形式
const hash = (password) => {
    return util.promisify(bcrypt.hash)(password, 10); // 這裡的 10 是 saltRounds 參數，用於生成 salt
};

// 將 bcrypt.compare 封裝成 Promise 形式
const compare = (plainPassword, hashedPassword) => {
    return util.promisify(bcrypt.compare)(plainPassword, hashedPassword);
};

module.exports = { hash, compare };