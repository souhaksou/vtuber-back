const Chart = require('../../models/chartModel');

const getChart = async (req, res, next) => {
    try {
        const result = await Chart.find({}, { _id: 0, name: 1, chartUrl: 1, width: 1, height: 1, max: 1 });
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

module.exports = { getChart };
