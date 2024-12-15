const { isValidObjectId } = require("mongoose");

const Auction = require("../../database/Models/auctionModel");

// returns an array of auctions that matches the http query
const searchAuction = async (req, res) => {
  try {
    const query = req.query.q;
    const limit = Math.round(req.query.limit);

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

    let auctionsQuery = Auction.find(searchQuery).sort({
      createdAt: -1,
    });

    if (limit) auctionsQuery = auctionsQuery.limit(limit);

    const auctions = await auctionsQuery.exec();
    res.status(200).send(auctions);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = searchAuction;
