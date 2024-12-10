const express = require("express");
const signUp = require("../handlers/authHandlers/signup");
const signIn = require("../handlers/authHandlers/signin");

const router = express.Router();

// Create a new User
router.post("/signup", signUp);

// Login
router.post("/signin", signIn);

module.exports = router;