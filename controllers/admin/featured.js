const Featured = require('../../models/featuredModel');

const getFeatured = async (req, res, next) => {
    try {
        const result = await Featured.find({}, { _id: 1, name: 1, text: 1 });
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'featured 取得失敗';
        next(error);
    }
};

const createFeatured = async (req, res, next) => {
    try {
        const { name, text } = req.body;
        const result = await Featured.findOne({ name });
        if (result !== null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'featured 已經存在';
            throw error;
        }
        else {
            const data = { name, text };
            await Featured.create(data);
            res.status(200).json({
                success: true,
                message: 'featured tag 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || 'featured tag 失敗';
        next(error);
    }
};

const editFeatured = async (req, res, next) => {
    try {
        const { _id, text } = req.body;
        const data = { text };
        const result = await Featured.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'featured 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 featured 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 featured 失敗';
        next(error);
    }
};

const deleteFeatured = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Featured.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'featured 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 featured 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 featured 失敗';
        next(error);
    }
};

module.exports = { getFeatured, createFeatured, editFeatured, deleteFeatured };
