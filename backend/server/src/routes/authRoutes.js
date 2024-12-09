const express = require("express");
const signUpHandler = require("../handlers/signupHandler");

const router = express.Router();

// Create a new User
router.post("/signup", signUpHandler);

// Login
router.post("/signin", (req, res) => {
    res.send("signin");
});

module.exports = router;