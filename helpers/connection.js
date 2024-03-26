// 資料庫
const mongoose = require("mongoose");

//連線資料庫
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://mongo:4vHJUlan19EC0fq6Q78MTwSd52r3VWZx@hnd1.clusters.zeabur.com:32479`);
        console.log("資料庫連線成功");
    } catch (err) {
        console.log("資料庫連線失敗");
        console.log(err)
    }
};

module.exports = { connectDB };