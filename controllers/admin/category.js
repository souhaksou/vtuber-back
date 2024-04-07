const Category = require('../../models/categoryModel');

const getCategory = async (req, res, next) => {
    try {
        const result = await Category.find();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'category 取得失敗';
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name, show } = req.body;
        const result = await Category.findOne({ name });
        if (result !== null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'category 已經存在';
            throw error;
        }
        else {
            const data = { name, show };
            await Category.create(data);
            res.status(200).json({
                success: true,
                message: '新增 category 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 category 失敗';
        next(error);
    }
};

const editCategory = async (req, res, next) => {
    try {
        const { _id, name, show } = req.body;
        const data = { name, show };
        const result = await Category.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'category 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 category 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 category 失敗';
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Category.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'category 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 category 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 category 失敗';
        next(error);
    }
};

module.exports = { getCategory, createCategory, editCategory, deleteCategory };
