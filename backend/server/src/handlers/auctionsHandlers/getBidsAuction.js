const {isValidObjectId, Types} = require("mongoose");

const Bid = require("../../database/Models/bidModel");
const pipeline = require("../../database/Pipelines/auctionBidsPipeline")


const getBidsAuction = async (req, res) => {
    const id = req.params.id;
    try{
        if (!id || !isValidObjectId(id))
            throw new Error("Invalid id");

        const bids = await Bid.aggregate(pipeline(id));
        res.status(200).send(bids);
    } catch (error){
        res.status(400).send({error: error.message});
    }
}

module.exports = getBidsAuction;