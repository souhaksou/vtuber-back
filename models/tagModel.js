const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "請輸入標籤"],
        unique: true
    },
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;