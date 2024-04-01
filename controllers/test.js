const { Category, Subcategory, Article, Tag } = require('../models/testModel');

const getC = async (req, res, next) => {
  try {
    const result = await Category.find();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const createC = async (req, res, next) => {
  try {
    const { name } = req.body;
    // 檢查是否存在
    const result = await Category.find({ name: name });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '已經存在';
      throw error;
    }
    else {
      const data = { name };
      await Category.create(data);
      res.status(200).json({
        success: true,
        message: '新增成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增失敗';
    next(error);
  }
};

const getS = async (req, res, next) => {
  try {
    const result = await Subcategory.find();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const createS = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;
    // 檢查是否存在
    const result = await Subcategory.find({ name: name, categoryId: categoryId });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '已經存在';
      throw error;
    }
    else {
      const data = { name, categoryId };
      await Subcategory.create(data);
      res.status(200).json({
        success: true,
        message: '新增成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增失敗';
    next(error);
  }
};

const getSC = async (req, res, next) => {
  try {
    const result = await Subcategory.find().populate('categoryId');
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const getCS = async (req, res, next) => {
  try {
    // const result = await Category.find().populate('subcategories');

    //聚合管道
    const pipeline = [
      {
        $group: {
          _id: '$categoryId',
          subcategories: { $push: { name: '$name', sid: '$_id' } },
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $project: {
          _id: 1,
          categoryName: { $arrayElemAt: ['$category.name', 0] },
          subcategories: 1,
        }
      },
      {
        $sort: { 'categoryName': 1 }
      }
    ];

    // 执行聚合操作
    const result = await Subcategory.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const getT = async (req, res, next) => {
  try {
    const result = await Tag.find();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const createT = async (req, res, next) => {
  try {
    const { name } = req.body;
    // 檢查是否存在
    const result = await Tag.find({ name: name });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '已經存在';
      throw error;
    }
    else {
      const data = { name };
      await Tag.create(data);
      res.status(200).json({
        success: true,
        message: '新增成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增失敗';
    next(error);
  }
};

const getA = async (req, res, next) => {
  try {
    const result = await Article.find();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

const createA = async (req, res, next) => {
  try {
    const { name, tags } = req.body;
    // 檢查是否存在
    const result = await Article.find({ name: name });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '已經存在';
      throw error;
    }
    else {
      const data = { name, tags };
      await Article.create(data);
      res.status(200).json({
        success: true,
        message: '新增成功',
      });
    }
  } catch (error) {
    console.error(error);
    error.message = error.message || '新增失敗';
    next(error);
  }
};

const getTA = async (req, res, next) => {
  try {

    //聚合管道
    const pipeline = [
      {
        $unwind: '$tags'
      },
      {
        $group: {
          _id: '$tags',
          articles: { $push: { name: '$name', aid: '$_id' } },
        }
      },
      {
        $lookup: {
          from: 'tags',
          localField: '_id',
          foreignField: '_id',
          as: 'tag'
        }
      },
      {
        $project: {
          _id: 1,
          tagName: { $arrayElemAt: ['$tag.name', 0] },
          articles: 1,
        }
      },
      {
        $sort: { 'tagName': 1 }
      }
    ];

    // 执行聚合操作
    const result = await Article.aggregate(pipeline);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(error);
    error.message = error.message || '取得失敗';
    next(error);
  }
};

module.exports = { getC, createC, getS, createS, getSC, getCS, getT, createT, getA, createA, getTA };
