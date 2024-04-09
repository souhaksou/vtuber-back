const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
}, { timestamps: true });

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;