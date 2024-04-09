const Article = require('../../models/articleModel');
const Home = require('../../models/homeModel');

const getArticle = async (req, res, next) => {
    try {
        const result = await Article.find({}, { _id: 1, title: 1, author: 1, subcategoryId: 1, slug: 1, highlight: 1, finished: 1 })
            .populate({ path: 'author', select: 'name' })
            .populate({
                path: 'subcategoryId', select: 'name _id',
                populate: { path: 'categoryId', select: 'name _id' }
            });
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'article 取得失敗';
        next(error);
    }
};

const getOneArticle = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Article.findById(_id)
            .populate({ path: 'tags', select: 'name _id' })
            .populate({
                path: 'subcategoryId', select: 'name _id',
                populate: { path: 'categoryId', select: 'name _id' }
            });
        console.log(result);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'article 取得失敗';
        next(error);
    }
};

const createArticle = async (req, res, next) => {
    try {
        const author = req.identity._id;
        const { title, description, subcategoryId, tags, slug, imgUrl, blockquote, text, highlight, finished } = req.body;
        const result = await Article.findOne({ slug });
        if (result !== null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = '相同的 slug 已經存在';
            throw error;
        }
        else {
            const data = { title, description, author, subcategoryId, tags, slug, imgUrl, blockquote, text, highlight, finished };
            await Article.create(data);
            res.status(200).json({
                success: true,
                message: '新增 article 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 article 失敗';
        next(error);
    }
};

const editArticle = async (req, res, next) => {
    try {
        const { _id, title, description, subcategoryId, tags, slug, imgUrl, blockquote, text, highlight, finished } = req.body;
        const check = await Article.findOne({ slug });
        if (check !== null && String(check._id) !== _id) {
            const error = new Error();
            error.statusCode = 400;
            error.message = '相同的 slug 已經存在';
            throw error;
        }
        const data = { title, description, subcategoryId, tags, slug, imgUrl, blockquote, text, highlight, finished };
        const result = await Article.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'article 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 article 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 article 失敗';
        next(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Article.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'article 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 article 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 article 失敗';
        next(error);
    }
};

const getActiveArticle = async (req, res, next) => {
    try {
        const result = await Home.find().populate({ path: 'articleId', select: 'title' });
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'article 取得失敗';
        next(error);
    }
};

const createActiveArticle = async (req, res, next) => {
    try {
        const { articleId } = req.body;
        const data = { articleId };
        await Home.create(data);
        res.status(200).json({
            success: true,
            message: '新增 article 成功',
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 article 失敗';
        next(error);
    }
};

const editActiveArticle = async (req, res, next) => {
    try {
        const { _id, articleId } = req.body;
        const data = { articleId };
        const result = await Home.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'article 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 article 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 article 失敗';
        next(error);
    }
};

const deleteActiveArticle = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Home.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'article 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 article 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 article 失敗';
        next(error);
    }
};

module.exports = { getArticle, createArticle, editArticle, deleteArticle, getOneArticle, getActiveArticle, createActiveArticle, editActiveArticle, deleteActiveArticle };
