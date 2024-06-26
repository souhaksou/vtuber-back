const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "請輸入分類"],
        unique: true
    },
    show: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;