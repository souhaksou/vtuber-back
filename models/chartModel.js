const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "請輸入標題"],
    },
    chartUrl: {
        type: String,
        required: [true, "請輸入網址"],
    },
    width: {
        type: Number,
        required: [true, "請輸入寬度"],
    },
    height: {
        type: Number,
        required: [true, "請輸入高度"],
    },
    max: {
        type: Number,
        required: [true, "請輸入最大寬度"]
    },
    highlight: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart;