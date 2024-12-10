const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    auctionId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("Bid", bidSchema);