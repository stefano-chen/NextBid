const express = require("express");

const getUser = require("../handlers/usersHandlers/getUser");
const searchUsers = require("../handlers/usersHandlers/searchUsers");


const router = express.Router();

// List of all users with a filtering query
router.get("/", searchUsers);

// User info based on an id
router.get("/:id", getUser);

module.exports = router;