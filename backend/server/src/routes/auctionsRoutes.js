const express = require("express");

const authCheck = require("../handlers/authHandlers/authCheck");
const createAuction = require("../handlers/auctionsHandlers/createAuction");
const searchAuction = require("../handlers/auctionsHandlers/searchAuctions");
const getAuction = require("../handlers/auctionsHandlers/getAuction");
const modifyAuction = require("../handlers/auctionsHandlers/modifyAuction");

const router = express.Router();

// List all Auctions filtering by a given query
router.get("/", searchAuction);

// Create a new Auction for the authenticated user
router.post("/", authCheck, createAuction);

// Info about an Auction given an id
router.get("/:id", getAuction);

// Modify info about an Auction identified by a given id, it requires authentication
router.put("/:id", authCheck, modifyAuction);

// Delete an Auction identified by a given id, it requires authentication
router.delete("/:id", authCheck, (req, res) => {
    res.send(req.params.id);
});

// List of all bids for an Auction identified by a given id
router.get("/:id/bids", (req, res) => {
    res.send(req.params.id);
});

// Create a new bid for an Auction identified by a given id, it requires authentication
router.post("/:id/bids", authCheck, (req, res) => {
    res.send(req.params.id);
});

module.exports = router;
