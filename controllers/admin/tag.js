const Tag = require('../../models/tagModel');

const getTag = async (req, res, next) => {
    try {
        const result = await Tag.find();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'tag 取得失敗';
        next(error);
    }
};

const createTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await Tag.findOne({ name });
        if (result !== null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'tag 已經存在';
            throw error;
        }
        else {
            const data = { name };
            await Tag.create(data);
            res.status(200).json({
                success: true,
                message: '新增 tag 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 tag 失敗';
        next(error);
    }
};

const editTag = async (req, res, next) => {
    try {
        const { _id, name } = req.body;
        const data = { name };
        const result = await Tag.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'tag 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 tag 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 tag 失敗';
        next(error);
    }
};

const deleteTag = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Tag.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'tag 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 tag 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 tag 失敗';
        next(error);
    }
};

module.exports = { getTag, createTag, editTag, deleteTag };
