const { isValidObjectId, Types } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");
// const Bid = require("../../database/Models/bidModel");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const auctionBidsPipeline = require("../../database/Pipelines/auctionBidsPipeline");

const getAuction = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) throw new Error("Invalid id");

        let auction = await Auction.findById(id);
        if (!auction) throw new Error("Auction not Found");

        // Convert the Mongoose Document into a Javascript Object
        // auction = auction.toObject();

        // Add an bids field (array of bids)
        // the bids are generated using an aggregation pipeline on the Bid collection
        // auction.bids = await Bid.aggregate(auctionBidsPipeline(id));
        res.status(200).send(auction);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

module.exports = getAuction;
