const express = require("express");
const signUp = require("../handlers/authHandlers/signup");
const signIn = require("../handlers/authHandlers/signin");
const logout = require("../handlers/authHandlers/logout");
const authCheck = require("../handlers/authHandlers/authCheck");

const router = express.Router();

// Create a new User
router.post("/signup", signUp);

// Login
router.post("/signin", signIn);

router.all("/logout", authCheck, logout);

module.exports = router;