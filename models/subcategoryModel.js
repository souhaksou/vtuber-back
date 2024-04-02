const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "請輸入子分類"],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "請輸入分類id"],
    }
}, { timestamps: true });

subcategorySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'categoryId',
        model: 'Category'
    });
    next();
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;