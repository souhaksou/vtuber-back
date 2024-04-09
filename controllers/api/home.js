const Banner = require('../../models/bannerModel');
const Home = require('../../models/homeModel');
const Chart = require('../../models/chartModel');

const getBanner = async () => {
    try {
        const result = await Banner.find({}, { _id: 0, bannerUrl: 1 });
        return result;
    } catch (error) {
        console.error(error);
    }
};

const getArticle = async (req, res, next) => {
    try {
        const result = await Home.find({}, { _id: 0, _articleId: 1 })
            .populate({
                path: 'articleId', select: '_id title description slug subcategoryId imgUrl',
                populate: {
                    path: 'subcategoryId', select: '-_id name categoryId',
                    populate: {
                        path: 'categoryId', select: '-_id name'
                    }
                }
            });
        return result;
    } catch (error) {
        console.error(error);
    }
};


const getChart = async (req, res, next) => {
    try {
        const result = await Chart.find({ highlight: true }, { _id: 0, name: 1, chartUrl: 1, width: 1, height: 1, highlight: 1 });
        return result;
    } catch (error) {
        console.error(error);
    }
};

const getHome = async (req, res, next) => {
    try {
        const banner = await getBanner();
        const article = await getArticle();
        const chart = await getChart();
        const result = { banner, article, chart };
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

module.exports = { getHome };
