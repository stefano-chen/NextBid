const mongoose = require("mongoose");

const bidSchema = mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    }
}, {timestamps: true})