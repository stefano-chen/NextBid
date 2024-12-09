const express = require("express");
const whoamiHandler = require("../handlers/whoamiHandler");

const router = express.Router();

// If the user is authenticated, give back the user's info
router.get("/", whoamiHandler);

module.exports = router;