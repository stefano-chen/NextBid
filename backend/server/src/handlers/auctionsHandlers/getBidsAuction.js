const { isValidObjectId, Types } = require("mongoose");

const Bid = require("../../database/Models/bidModel");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const auctionBidsPipeline = require("../../database/Pipelines/auctionBidsPipeline");

// returns an array of bids for an auction identified by an id
const getBidsAuction = async (req, res) => {
    const id = req.params.id;

    try {
        if (!id || !isValidObjectId(id)) throw new Error("Invalid id");

        // Apply an join between the bids and auctions collections
        const bids = await Bid.aggregate(auctionBidsPipeline(id));
        res.status(200).send(bids);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = getBidsAuction;
