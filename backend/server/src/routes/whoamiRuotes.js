const express = require("express");
const whoami = require("../handlers/whoamiHandlers/whoami");

const router = express.Router();

// If the user is authenticated, give back the user's info
router.get("/", whoami);

module.exports = router;