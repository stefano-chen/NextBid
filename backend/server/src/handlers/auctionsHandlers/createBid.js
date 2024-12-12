const {isValidObjectId} = require("mongoose");
const Bid = require("../../database/Models/bidModel");
const Auction = require("../../database/Models/auctionModel");
const winningBidPipeline = require("../../database/Pipelines/winningBidPipeline");

const minBidInc = 0.5;

const createBid = async (req, res) => {
    const userId = req.session.uid;
    const auctionId = req.params.id;
    const {amount} = req.body;
    try {
        if (!isValidObjectId(auctionId) || !isValidObjectId(userId))
            throw new Error("Invalid id");

        const auction = await Auction.findById(auctionId);
        if (!auction)
            throw new Error("Auction not Found");
        
        let [bid] = await Bid.aggregate(winningBidPipeline(auctionId));

        highestBid = (bid) ? bid.winningBid.amount : auction.initialBid;
        if (amount <= highestBid || (amount - highestBid) < minBidInc)
            throw new Error("Bid Too Low");

        const bidData = {
            user: userId,
            auction: auctionId,
            amount
        }
        bid = await Bid.create(bidData);
        
        res.status(200).send(bid);
    } catch (error) {
        res.status(400).send({error: error.message})
    }
}

module.exports = createBid;