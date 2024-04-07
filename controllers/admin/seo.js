const Seo = require('../../models/seoModel');

const getSeo = async (req, res, next) => {
  try {
    const result = await Seo.find({}, { _id: 1, page: 1, h1: 1, title: 1, description: 1, imgUrl: 1, type: 1, author: 1 });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || 'seo 取得失敗';
    next(error);
  }
};

const createSeo = async (req, res, next) => {
  try {
    const { page, h1, title, description, imgUrl, type, author } = req.body;
    const result = await Seo.findOne({ page });
    if (result !== null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'seo 已經存在';
      throw error;
    }
    else {
      const data = { page, h1, title, description, imgUrl, type, author };
      await Seo.create(data);
      res.status(200).json({
        success: true,
        message: '新增 seo 成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增 seo 失敗';
    next(error);
  }
};

const editSeo = async (req, res, next) => {
  try {
    const { _id, h1, title, description, imgUrl, type, author } = req.body;
    const data = { h1, title, description, imgUrl, type, author };
    const result = await Seo.findByIdAndUpdate(_id, { $set: data }, { new: true });
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'seo 不存在';
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: '編輯 seo 成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '編輯 seo 失敗';
    next(error);
  }
};

const deleteSeo = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const result = await Seo.findByIdAndDelete(_id);
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'seo 不存在';
      throw error;
    } else {
      res.status(200).json({
        success: true,
        message: '刪除 seo 成功'
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '刪除 seo 失敗';
    next(error);
  }
};

module.exports = { getSeo, createSeo, editSeo, deleteSeo };