const express = require("express");

const getUserHandler = require("../handlers/usersHandlers/getUser");
const searchUsersHandler = require("../handlers/usersHandlers/searchUsers");


const router = express.Router();

// List of all users with a filtering query
router.get("/", searchUsersHandler);

// User info based on an id
router.get("/:id", getUserHandler);

module.exports = router;