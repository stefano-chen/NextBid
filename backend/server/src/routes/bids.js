const express = require("express");

const router = express.Router();

// Infos about a bid identified by a given id
router.get("/:id", (req, res) => {
    res.send(req.params.id);
});


module.exports = router;