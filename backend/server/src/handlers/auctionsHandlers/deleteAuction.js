const { isValidObjectId, Types } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");
const Bid = require("../../database/Models/bidModel");

// Delete an auction, identified by an id
// Only the auction's owner can delete it
// Once an auction is deleted, all associated bids are deleted as well
// Returns the number of deleted documents in the auctions and bids collections
const deleteAuction = async (req, res) => {
    try {
        const uid = req.session.uid;
        const id = req.params.id;

        if (!isValidObjectId(id)) throw new Error("Invalid ID. Please check the ID and try again.");

        const auction = await Auction.findById(id, "owner");

        if (!auction) throw new Error("Auction not found");

        // Only the auction's owner can delete the auction
        if (uid !== auction.owner.toString()) throw new Error("You are not authorized to access this resource.");

        // Deletes the auction
        const deletedAuction = await Auction.deleteOne({
            _id: new Types.ObjectId(`${id}`),
        });

        // Deletes all the bids associated with the deleted auction
        const deletedBids = await Bid.deleteMany({
            auction: new Types.ObjectId(`${id}`),
        });

        res.status(200).send({ deletedAuction, deletedBids });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = deleteAuction;
