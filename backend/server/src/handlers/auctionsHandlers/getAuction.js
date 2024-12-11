const { isValidObjectId, Types } = require("mongoose");
const Auction = require("../../database/Models/auctionModel");
const Bid = require("../../database/Models/bidModel");
const auctionBidsPipeline = require("../../database/Pipelines/auctionBidsPipeline");

const getAuction = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        let auction = await Auction.findById(id)
        if (!auction)
            throw new Error("Auction not Found");
        auction = auction.toObject();
        auction.bids = await Bid.aggregate(auctionBidsPipeline(id))
        if (!auction) throw new Error("Auction not Found");
        res.status(200).send(auction);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

module.exports = getAuction;
