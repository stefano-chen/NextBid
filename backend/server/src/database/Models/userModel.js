const mongoose = require("mongoose");

// A schema defined the document's structure
// By default Mongoose adds an implicit _id field
// In Mongoose the creation/modification of an document triggers a validation based on this schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// In Mongoose a Model represents a collection
module.exports = mongoose.model("User", userSchema);
