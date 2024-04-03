const Subcategory = require('../../models/subcategoryModel');

const getSubcategory = async (req, res, next) => {
    try {
        const result = await Subcategory.find();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'subcategory 取得失敗';
        next(error);
    }
};

const createSubcategory = async (req, res, next) => {
    try {
        const { name, categoryId } = req.body;
        // 檢查帳號是否存在
        const result = await Subcategory.find({ name, categoryId });
        if (result.length > 0) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'subcategory 已經存在';
            throw error;
        }
        else {
            const data = { name, categoryId };
            await Subcategory.create(data);
            res.status(200).json({
                success: true,
                message: '新增 subcategory 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 subcategory 失敗';
        next(error);
    }
};

const editSubcategory = async (req, res, next) => {
    try {
        const { _id, name, categoryId } = req.body;
        const check = await Subcategory.find({ name, categoryId });
        if (check.length > 0) {
            const error = new Error();
            error.statusCode = 400;
            error.message = '相同的 subcategory 已經存在';
            throw error;
        }
        const data = { name, categoryId };
        const result = await Subcategory.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'subcategory 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 subcategory 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 subcategory 失敗';
        next(error);
    }
};

const deleteSubcategory = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Subcategory.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'subcategory 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 subcategory 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 subcategory 失敗';
        next(error);
    }
};

module.exports = { getSubcategory, createSubcategory, editSubcategory, deleteSubcategory };
