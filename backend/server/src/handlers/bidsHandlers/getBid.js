const {isValidObjectId} = require("mongoose");
const Bid = require("../../database/Models/bidModel");

const getBid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id))
            throw new Error("Invalid id");
        const bid = await Bid.findById(id);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports = getBid;