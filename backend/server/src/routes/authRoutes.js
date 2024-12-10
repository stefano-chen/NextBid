const express = require("express");
const signUp = require("../handlers/authHandlers/signup");
const signIn = require("../handlers/authHandlers/signin");
const logout = require("../handlers/authHandlers/logout");

const router = express.Router();

// Create a new User
router.post("/signup", signUp);

// Login
router.post("/signin", signIn);

router.all("/logout", logout);

module.exports = router;