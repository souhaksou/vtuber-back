const Subcategory = require('../../models/subcategoryModel');

const getCategory = async (req, res, next) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$categoryId',
                    subcategories: { $push: { name: '$name', show: '$show', _id: '$_id' } },
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: { $arrayElemAt: ['$category.name', 0] },
                    show: { $arrayElemAt: ['$category.show', 0] },
                    subcategories: 1,
                }
            },
            {
                $sort: { 'name': 1 }
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
        error.message = error.message || '分類取得失敗';
        next(error);
    }
};

module.exports = { getCategory };
