const mongoose = require('mongoose');

const featuredSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "請輸入名稱"],
    unique: true
  },
  text: {
    type: String,
    required: [true, "請輸入內容"]
  }
}, { timestamps: true });

const Featured = mongoose.model('Featured', featuredSchema);

module.exports = Featured;