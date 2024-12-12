const {isValidObjectId} = require("mongoose");
const Bid = require("../../database/Models/bidModel");
const Auction = require("../../database/Models/auctionModel");

const createBid = async (req, res) => {
    const userId = req.session.uid;
    const auctionId = req.params.id;
    const bidData = req.body;
    try {
        if (!isValidObjectId(auctionId) || !isValidObjectId(userId))
            throw new Error("Invalid id");

        const auction = await Auction.findById(auctionId);
        if (!auction)
            throw new Error("Auction not Found");

        bidData.userId = userId;
        bidData.auctionId;
        const bid = await Bid.create(bidData);
        
        res.status(200).send(bid);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = createBid;