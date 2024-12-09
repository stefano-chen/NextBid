const express = require("express");
const signUpHandler = require("../handlers/signupHandler");
const signInHandler = require("../handlers/signinHandler");

const router = express.Router();

// Create a new User
router.post("/signup", signUpHandler);

// Login
router.post("/signin", signInHandler);

module.exports = router;