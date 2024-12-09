const express = require("express");

const router = express.Router();

// Create a new User
router.post("/signup", (req, res) => {
    res.send("signup");
});

// Login
router.post("/signin", (req, res) => {
    res.send("signin");
});

module.exports = router;