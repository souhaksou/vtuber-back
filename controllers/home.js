const Banner = require('../models/bannerModel');

const getBanner = async (req, res, next) => {
    try {
        const result = await Banner.find();
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'banner 取得失敗';
        next(error);
    }
};

const createBanner = async (req, res, next) => {
    try {
        const { bannerUrl } = req.body;
        const data = { bannerUrl };
        await Banner.create(data);
        res.status(200).json({
            success: true,
            message: '新增 banner 成功',
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 banner 失敗';
        next(error);
    }
};

const editBanner = async (req, res, next) => {
    try {
        const { _id, bannerUrl } = req.body;
        const data = { bannerUrl };
        const result = await Banner.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'banner 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 banner 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 banner 失敗';
        next(error);
    }
};

const deleteBanner = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Banner.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'banner 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 banner 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 banner 失敗';
        next(error);
    }
};

// 精選文章設定

// 提供前端 banner 文章 直播 圖表

module.exports = { getBanner, createBanner, editBanner, deleteBanner };
