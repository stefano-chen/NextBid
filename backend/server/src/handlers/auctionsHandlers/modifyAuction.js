const { isValidObjectId } = require("mongoose");
const { isEmpty } = require("validator");

const Auction = require("../../database/Models/auctionModel");

// Modify some info about an auction, identified by an id
// Only the auction's owner can modify
// At the moment only the title and description are modifiable
const modifyAuction = async (req, res) => {
    try {
        const id = req.params.id;

        // Allows only to modify title and description
        const { title, description } = req.body;

        if (!isValidObjectId(id)) throw new Error("Invalid ID. Please check the ID and try again.");

        let auction = await Auction.findById(id);
        if (!auction) throw new Error("Auction not found");

        // Only the auction's owner can modify the auction
        if (req.session.uid !== auction.owner.toString())
            throw new Error("You are not authorized to access this resource.");

        if (title && !isEmpty(title, { ignore_whitespace: true }))
            // .trim removes the whitespaces at the begin and at the end of the string
            auction.title = title.trim();

        if (description && !isEmpty(description, { ignore_whitespace: true }))
            // .trim removes the whitespaces at the begin and at the end of the string
            auction.description = description.trim();

        // Validates only the modified fields
        auction = await auction.save({ validateModifiedOnly: true });
        res.status(200).send(auction);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = modifyAuction;
