const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
        min: new Date()
    },
    initialBid: {
        type: Number,
        required: true,
        min: 0,
    },
    owner:{
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Auction", auctionSchema);
