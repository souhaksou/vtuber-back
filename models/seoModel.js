const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
    page: {
        type: String,
        required: [true, "請輸入page名稱"],
        unique: true
    },
    h1: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: [true, "請輸入標題"],
    },
    description: {
        type: String,
        default: ''
    },
    imgUrl: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Seo = mongoose.model('Seo', seoSchema);

module.exports = Seo;