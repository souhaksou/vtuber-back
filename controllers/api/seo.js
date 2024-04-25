const Seo = require('../../models/seoModel');

const getSeo = async (req, res, next) => {
  try {
    const { page } = req.body;
    const result = await Seo.findOne({ page }, { _id: 0, page: 1, h1: 1, title: 1, description: 1, imgUrl: 1, type: 1, author: 1 });
    if (result === null) {
      const error = new Error();
      error.statusCode = 400;
      error.message = 'page 不存在';
      throw error;
    } else {
      res.status(200).json({
        success: true,
        data: result
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || 'seo 取得失敗';
    next(error);
  }
};


module.exports = { getSeo };