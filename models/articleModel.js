const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "請輸入標題"],
    },
    description: {
        type: String,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "請輸入作者"]
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    slug: {
        type: String,
        required: [true, "請輸入文章代稱"],
        unique: true
    },
    imgUrl: {
        type: String,
        default: ''
    },
    blockquote: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        required: [true, "請輸入內容"]
    },
    highlight: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;