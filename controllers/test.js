const { Category, Subcategory, Article } = require('../models/testModel');

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
    const { name, subcategoryId } = req.body;
    // 檢查是否存在
    const result = await Article.find({ name: name, subcategoryId: subcategoryId });
    if (result.length > 0) {
      const error = new Error();
      error.statusCode = 400;
      error.message = '已經存在';
      throw error;
    }
    else {
      const data = { name, subcategoryId };
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


    // 聚合管道
    const pipeline = [
      // 第一阶段：将小分类按大分类进行分组
      {
        $group: {
          _id: '$categoryId',
          categoryName: { $first: '$categoryId' }, // 获取大分类的id
          subcategories: { $push: '$name' }, // 将小分类名称添加到数组中
        }
      },
      // 第二阶段：将大分类名称填充到结果中
      {
        $lookup: {
          from: 'categories', // 大分类模型的集合名称
          localField: 'categoryName',
          foreignField: '_id',
          as: 'category'
        }
      },
      // 第三阶段：重新格式化输出
      {
        $project: {
          _id: 0, // 不显示默认的 _id 字段
          categoryName: '$category.name', // 获取大分类名称
          subcategories: 1, // 显示小分类数组
        }
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

module.exports = { getC, createC, getS, createS, getA, createA, getSC, getCS };
