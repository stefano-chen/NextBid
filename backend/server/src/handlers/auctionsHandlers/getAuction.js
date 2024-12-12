const { isValidObjectId, Types } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const auctionOwnerPipeline = require("../../database/Pipelines/auctionOwnerPipeline");

const getAuction = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) throw new Error("Invalid id");

        let auction = await Auction.findById(id);
        if (!auction) throw new Error("Auction not Found");

        auction = await Auction.aggregate(auctionOwnerPipeline(id));

        res.status(200).send(auction);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

module.exports = getAuction;
