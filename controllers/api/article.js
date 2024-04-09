const Article = require('../../models/articleModel');
const Home = require('../../models/homeModel');

const getArticle = async (req, res, next) => {
    try {
        const result = await Home.find({}, { _id: 0, _articleId: 1 })
            .populate({
                path: 'articleId', select: '_id title description slug subcategoryId imgUrl createdAt',
                populate: {
                    path: 'subcategoryId', select: '-_id name show categoryId',
                    populate: {
                        path: 'categoryId', select: '-_id name show'
                    }
                }
            });
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error(error);
        error.message = error.message || '資料取得失敗';
        next(error);
    }
};

const getSlugArticle = async (req, res, next) => {
    try {
        const { slug } = req.body;
        const result = await Article.findOne({ slug }, { _id: 0, title: 1, description: 1, author: 1, subcategoryI: 1, tags: 1, slug: 1, imgUrl: 1, blockquote: 1, text: 1, highlight: 1, createdAt: 1 })
            .populate({
                path: 'subcategoryId', select: '-_id name show categoryId',
                populate: {
                    path: 'categoryId', select: '-_id name show'
                }
            }).populate({ path: 'tags', select: '-_id name' });
        if (result === null) {
            const error = new Error();
            error.statusCode = 400;
            error.message = 'slug 取得失敗';
            throw error;
        }
        else {
            res.status(200).json({
                success: true,
                data: result
            });
        }
    } catch (error) {
        console.error(error);
        error.message = error.message || '資料取得失敗';
        next(error);
    }
};

module.exports = { getArticle, getSlugArticle };
