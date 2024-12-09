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
    },
    initalBid: {
        type: Number,
        required: true,
        min: 0,
    },
    owner:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    winningUser: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
});

module.exports = mongoose.model("Auction", auctionSchema);
