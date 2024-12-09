const express = require("express");

const router = express.Router();

// List of all users with a filtering query
router.get("/", (req, res) => {
    res.send(req.query);
});

// User info based on an id
router.get("/:id", (req, res) => {
    res.send(req.params.id);
});

module.exports = router;