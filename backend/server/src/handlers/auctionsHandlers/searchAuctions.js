const { isValidObjectId } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");

// returns an array of auctions that matches the http query
const searchAuction = async (req, res) => {
  try {
    const query = req.query.q;

    let searchQuery = {};

    if (query) {
      const words = query.trim().split(/\s+/); // Splits on spaces and handles multiple spaces
      searchQuery = {
        $or: words.flatMap((word) => [
          { title: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
        ]),
      };
    }

    const auctions = await Auction.find(searchQuery).sort({
      createdAt: -1,
    });

    res.status(200).send(auctions);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = searchAuction;
