const { isValidObjectId } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");

// returns an array of auctions that matches the http query
const searchAuction = async (req, res) => {
    const query = req.query;
    try {
        const query = req.query;

        // if filtering by id, then check if is a valid id
        if (query._id && !isValidObjectId(query._id))
            throw new Error("Invalid id");

        const auctions = await Auction.find(query);

        res.status(200).send(auctions);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = searchAuction;
