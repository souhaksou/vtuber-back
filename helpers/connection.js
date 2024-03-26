// 資料庫
const mongoose = require("mongoose");

//連線資料庫
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}`);
        console.log("資料庫連線成功");
        mongoose.connection.useDb(`${process.env.DB_NAME}`);
        console.log(`使用資料庫：${process.env.DB_NAME}`);
    } catch (error) {
        console.log("資料庫錯誤");
        console.error(error)
    }
};

module.exports = { connectDB };