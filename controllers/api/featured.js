const Featured = require('../../models/featuredModel');

const getFeatured = async (req, res, next) => {
    try {
        const result = await Featured.find({}, { _id: 0, text: 1 });
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

module.exports = { getFeatured };
