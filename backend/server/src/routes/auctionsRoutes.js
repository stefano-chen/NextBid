const express = require("express");

// Request Handlers
const authCheck = require("../handlers/authHandlers/authCheck");
const createAuction = require("../handlers/auctionsHandlers/createAuction");
const searchAuction = require("../handlers/auctionsHandlers/searchAuctions");
const getAuction = require("../handlers/auctionsHandlers/getAuction");
const modifyAuction = require("../handlers/auctionsHandlers/modifyAuction");
const deleteAuction = require("../handlers/auctionsHandlers/deleteAuction");
const getBidsAuction = require("../handlers/auctionsHandlers/getBidsAuction");
const createBid = require("../handlers/auctionsHandlers/createBid")

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
router.delete("/:id", authCheck, deleteAuction);

// List of all bids for an Auction identified by a given id
router.get("/:id/bids", getBidsAuction);

// Create a new bid for an Auction identified by a given id, it requires authentication
router.post("/:id/bids", authCheck, createBid);

module.exports = router;
