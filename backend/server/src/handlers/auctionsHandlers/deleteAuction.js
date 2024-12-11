const Auction = require("../../database/Models/auctionModel");
const Bid = require("../../database/Models/bidModel");
const {isValidObjectId, Types} = require("mongoose");

const deleteAuction = async (req, res) => {
    try {
        const uid = req.session.uid;
        const id = req.params.id;

        if (!isValidObjectId(id))
            throw new Error("Invalid id");

        const auction = await Auction.findById(id, "owner");
        
        if (!auction)
            throw new Error("Auction not Found");

        if (uid !== auction.owner.toString())
            throw new Error("Owner mismatch");

        const deletedAuction = await Auction.deleteOne({_id: new Types.ObjectId(`${id}`)});
        const deletedBids = await Bid.deleteMany({auction: new Types.ObjectId(`${id}`)});
        res.status(200).send([deletedAuction, deletedBids]);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports = deleteAuction;