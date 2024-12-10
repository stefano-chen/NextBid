const express = require("express");
const signUpHandler = require("../handlers/authHandlers/signup");
const signInHandler = require("../handlers/authHandlers/signin");

const router = express.Router();

// Create a new User
router.post("/signup", signUpHandler);

// Login
router.post("/signin", signInHandler);

module.exports = router;