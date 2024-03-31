const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Category = mongoose.model('Category', categorySchema);

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});
const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  }
});
const Article = mongoose.model('Article', articleSchema);

module.exports = { Category, Subcategory, Article };
