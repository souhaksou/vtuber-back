const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerUrl: {
    type: String,
    required: [true, "請輸入網址"],
  },
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;