const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "請輸入標題"],
        unique: true
    },
    content: {
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
        unique: true
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
    highlight: {
        type: Boolean,
        default: false
    },
    finished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// articleSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'tags',
//         model: 'Tag'
//     });
//     next();
// });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;