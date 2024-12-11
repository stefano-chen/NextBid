const express = require("express");

// Request Handlers
const whoami = require("../handlers/whoamiHandlers/whoami");
const authCheck = require("../handlers/authHandlers/authCheck");

const router = express.Router();

// If the user is authenticated, give back the user's info
router.get("/", authCheck, whoami);

module.exports = router;
