const { isValidObjectId } = require("mongoose");
const { isEmpty } = require("validator");
const Auction = require("../../database/Models/auctionModel");

const modifyAuction = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        let auction = await Auction.findById(id);
        if (!auction) throw new Error("Auction not Found");
        if (req.session.uid !== auction.owner.toString())
            throw new Error("Owner mismatch");

        if (title && !isEmpty(title, { ignore_whitespace: true })) {
            auction.title = title.trim();
        }

        if (description && !isEmpty(description, { ignore_whitespace: true })) {
            auction.description = description.trim();
        }

        auction = await auction.save({ validateModifiedOnly: true });
        res.status(200).send(auction);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = modifyAuction;
