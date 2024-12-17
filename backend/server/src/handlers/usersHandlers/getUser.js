const { isValidObjectId } = require("mongoose");

const User = require("../../database/Models/userModel");
const Auction = require("../../database/Models/auctionModel");
const userWinsPipeline = require("../../database/Pipelines/userWinsPipeline");

// returns a user data, identified by an id
const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    // checks if the id is valid
    if (!isValidObjectId(id))
      throw new Error("Invalid ID. Please check the ID and try again.");

    User.aggregate();

    // returns the id, username, name and surname of the searched user
    let user = await User.findById(id, "username name surname bio");
    if (!user) throw new Error("User not found");

    const wonAuctions = await Auction.aggregate(userWinsPipeline(id));

    user = user.toObject();
    user.wonAuctions = wonAuctions;

    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getUser;
