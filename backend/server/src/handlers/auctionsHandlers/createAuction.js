const Auction = require("../../database/Models/auctionModel");

// Create an auction where the owner is the current logged in user
const createAuction = async (req, res) => {
    try {
        const auctionData = req.body;
        auctionData.owner = req.session.uid;

        // Create the desired auction
        // throws an error if auctionData doesn't respect the Auction Schema
        const auction = await Auction.create(auctionData);
        res.status(200).send(auction);
    } catch (error) {
        res.status(400).send({ error: "Invalid Auction Data" });
    }
};

module.exports = createAuction;
