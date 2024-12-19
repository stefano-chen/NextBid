const { isValidObjectId, Types } = require("mongoose");
const Bid = require("../../database/Models/bidModel");
const Auction = require("../../database/Models/auctionModel");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const winningBidPipeline = require("../../database/Pipelines/winningBidPipeline");

// represent the minimum bid increase
const minBidInc = 0.5;

// Make a new bid for an auction identified by an id
// The new bid is accepted only if higher than the highest bid
// and it must be at least minBidInc higher than the highest bid
const createBid = async (req, res) => {
  const userId = req.session.uid;
  const auctionId = req.params.id;
  const { amount } = req.body;

  try {
    if (!isValidObjectId(auctionId) || !isValidObjectId(userId))
      throw new Error("Invalid ID. Please check the ID and try again.");

    const auction = await Auction.findById(auctionId);
    if (!auction) throw new Error("Auction not found");

    const dueDate = new Date(auction.dueDate).getTime();

    if (dueDate <= new Date().getTime()) throw new Error("Auction Closed");

    let highestBid = auction.initialBid;

    // returns an array of bids associated to the auctionId
    // the array is sorted in descending order
    // bid contains the first element of the array (the highest current bid)
    let [bid] = await Bid.aggregate(winningBidPipeline(auctionId));
    if (bid) highestBid = bid.winningBid.amount;

    if (amount <= highestBid || amount - highestBid < minBidInc)
      throw new Error(
        `The amount entered is too low.\nPlease enter at least ${
          highestBid + minBidInc
        }`
      );

    // Makes the bid using the uid inside the session,
    // the auctionId provided as request parameter
    // and the amount retrieved from the request body
    const bidData = {
      user: userId,
      auction: auctionId,
      amount,
    };
    bid = await Bid.create(bidData);

    auction.set("winner", userId, Types.ObjectId);
    await auction.save();

    res.status(200).send(bid);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = createBid;
