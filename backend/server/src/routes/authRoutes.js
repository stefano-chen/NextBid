const express = require("express");

// Request Handlers
const signUp = require("../handlers/authHandlers/signup");
const signIn = require("../handlers/authHandlers/signin");
const logout = require("../handlers/authHandlers/logout");
const authCheck = require("../handlers/authHandlers/authCheck");

const router = express.Router();

// Create a new User
router.post("/signup", signUp);

// Login
router.post("/signin", signIn);

// The .all method match all HTTP methods (GET, POST, PUT, DELETE, etc.)
// Once called, it destroy the current session from the Session store and the client cookie
router.all("/logout", authCheck, logout);

module.exports = router;
