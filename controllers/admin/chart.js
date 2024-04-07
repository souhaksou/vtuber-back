const Chart = require('../../models/chartModel');

const getChart = async (req, res, next) => {
    try {
        const result = await Chart.find({}, { _id: 1, name: 1, chartUrl: 1, width: 1, height: 1, max: 1 });
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || 'chart 取得失敗';
        next(error);
    }
};

const createChart = async (req, res, next) => {
    try {
        const { name, chartUrl, width, height, max } = req.body;
        const data = { name, chartUrl, width, height, max };
        await Chart.create(data);
        res.status(200).json({
            success: true,
            message: '新增 chart 成功',
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || '新增 chart 失敗';
        next(error);
    }
};

const editChart = async (req, res, next) => {
    try {
        const { _id, name, chartUrl, width, height, max } = req.body;
        const data = { name, chartUrl, width, height, max };
        const result = await Chart.findByIdAndUpdate(_id, { $set: data }, { new: true });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'chart 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '編輯 chart 成功',
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '編輯 chart 失敗';
        next(error);
    }
};

const deleteChart = async (req, res, next) => {
    try {
        const { _id } = req.body;
        const result = await Chart.findByIdAndDelete(_id);
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'chart 不存在';
            throw error;
        } else {
            res.status(200).json({
                success: true,
                message: '刪除 chart 成功'
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '刪除 chart 失敗';
        next(error);
    }
};

module.exports = { getChart, createChart, editChart, deleteChart };
