const {isValidObjectId, Types} = require("mongoose");
const Bid = require("../../database/Models/bidModel");
const bidInfoPipeline = require("../../database/Pipelines/bidInfoPipeline")


// TODO: implement the lookup for the auctions collection.

const getBid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id)) throw new Error("Invalid id");
        // instead of findById, let's use a $lookup aggregation
        // const bid = await Bid.findById(id);
        const [bid] = await Bid.aggregate(bidInfoPipeline(id));
        if (!bid) throw new Error("Bid not Found");
        res.status(200).send(bid);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = getBid;
