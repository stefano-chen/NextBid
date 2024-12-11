const mongoose = require("mongoose");

// A schema defined the document's structure
// By default Mongoose adds an implicit _id field
// In Mongoose the creation/modification of an document triggers a validation based on this schema
// if the timestamps propriety is set, then Mongoose adds the createdAt and updatedAt fields to the document
const auctionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        // A date is represented using the format mm-dd-yyyy
        dueDate: {
            type: Date,
            required: true,
            min: new Date(),
        },
        initialBid: {
            type: Number,
            required: true,
            min: 0,
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

// In Mongoose a Model represents a collection
module.exports = mongoose.model("Auction", auctionSchema);
