const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "請輸入標題"],
        unique: true
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
        required: [true, "請輸文章代稱"],
        unique: true
    },
    imgUrl: {
        type: String,
    },
    summary: {
        type: String,
    },
    highlight: {
        type: Boolean,
    },
    blockquote: {
        type: String,
    },
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