const mongoose = require("mongoose");

// A schema defined the document's structure
// By default Mongoose adds an implicit _id field
// In Mongoose the creation/modification of an document triggers a validation based on this schema
// the Schema constructor accept an options argurment (is an Object)
// if the timestamps propriety is set, then Mongoose adds the createdAt and updatedAt fields to the document
const bidSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        auction: {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

// In Mongoose a Model represents a collection
module.exports = mongoose.model("Bid", bidSchema);
