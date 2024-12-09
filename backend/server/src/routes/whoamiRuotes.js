const express = require("express");

const router = express.Router();

// If the user is authenticated, give back the user's info
router.get("/", (req, res) => {
    res.send("whoami");
});

module.exports = router;