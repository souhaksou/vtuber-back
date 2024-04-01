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

subcategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'categoryId',
    model: 'Category'
  });
  next();
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

const Tag = mongoose.model('Tag', tagSchema);

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // subcategoryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Subcategory',
  //   required: true
  // }
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

articleSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'tags',
    model: 'Tag'
  });
  next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = { Category, Subcategory, Article, Tag };
