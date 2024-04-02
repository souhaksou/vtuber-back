const jwt = require("jsonwebtoken");
const dayjs = require('dayjs');
const Account = require('../../models/accountModel');
const { hash, compare } = require('../../helpers/bcrypt');

const getAccount = async (req, res, next) => {
  try {
    const result = await Account.find();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '帳號取得失敗';
    next(error);
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { name, account, password } = req.body;
    // 檢查帳號是否存在
    const result = await Account.find({ account });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '帳號已經存在';
      throw error;
    }
    else {
      const hashedPassword = await hash(password, 10);
      const data = { name, account, password: hashedPassword };
      await Account.create(data);
      res.status(200).json({
        success: true,
        message: '新增帳號成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增帳號失敗';
    next(error);
  }
};

const editAccount = async (req, res, next) => {
  try {
    const { _id, name, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const data = { name, password: hashedPassword };
    const result = await Account.findByIdAndUpdate(_id, { $set: data }, { new: true });
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '帳號不存在';
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: '編輯帳號成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '編輯帳號失敗';
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await Account.findByIdAndDelete(_id);
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '帳號不存在';
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: '刪除帳號成功'
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '刪除帳號失敗';
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    const result = await Account.findOne({ account });
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '帳號不存在';
      throw error;
    }
    const compareResult = await compare(password, result.password);
    if (compareResult === false) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '密碼錯誤';
      throw error;
    }
    else {
      const payload = { _id: result._id, name: result.name, account };
      const secret = 'QQVtuber';
      const expiresIn = '7d';
      const token = jwt.sign(payload, secret, { expiresIn });
      const expirationDate = dayjs().add(7, 'day');
      res.status(200).json({
        success: true,
        message: '登入成功',
        token,
        expirationDate
      });
    }
  }
  catch (error) {
    console.error(error);
    error.message = error.message || '登入失敗';
    next(error);
  }
};

module.exports = { getAccount, createAccount, editAccount, deleteAccount, login };
