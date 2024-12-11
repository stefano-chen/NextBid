const express = require("express");

// Request Handlers
const getBid = require("../handlers/bidsHandlers/getBid");

const router = express.Router();

// Infos about a bid identified by a given id
router.get("/:id", getBid);

module.exports = router;
