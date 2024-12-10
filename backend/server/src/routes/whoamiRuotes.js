const express = require("express");
const whoamiHandler = require("../handlers/whoamiHandlers/whoami");

const router = express.Router();

// If the user is authenticated, give back the user's info
router.get("/", whoamiHandler);

module.exports = router;