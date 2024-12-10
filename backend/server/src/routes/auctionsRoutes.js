const express = require("express");
const authCheck = require("../handlers/authHandlers/authCheck")

const router = express.Router();

// List all Auctions filtering by a given query
router.get("/", (req, res) => {
    res.send(req.query);
});

// Create a new Auction for the authenticated user
router.post("/", authCheck, (req, res) => {
    res.send("New Auction");
});

// Info about an Auction given an id
router.get("/:id", (req, res) => {
    res.send(req.params.id);
});

// Modify info about an Auction identified by a given id, it requires authentication
router.put("/:id", (req, res) => {
    res.send(req.params.id);
});

// Delete an Auction identified by a given id, it requires authentication
router.delete("/:id", (req, res) => {
    res.send(req.params.id);
});

// List of all bids for an Auction identified by a given id
router.get("/:id/bids", (req, res) => {
    res.send(req.params.id);
});

// Create a new bid for an Auction identified by a given id, it requires authentication
router.post("/:id/bids", (req, res) => {
    res.send(req.params.id);
});

module.exports = router;