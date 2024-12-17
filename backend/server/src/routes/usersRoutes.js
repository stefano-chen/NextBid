const express = require("express");

// Request Handlers
const getUser = require("../handlers/usersHandlers/getUser");
const searchUsers = require("../handlers/usersHandlers/searchUsers");
const updateBio = require("../handlers/usersHandlers/updateBio");
const authCheck = require("../handlers/authHandlers/authCheck");

const router = express.Router();

// List of all users with a filtering query
router.get("/", searchUsers);

// User info based on an id
router.get("/:id", getUser);

router.post("/bio", authCheck, updateBio);

module.exports = router;
