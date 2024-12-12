const { isValidObjectId } = require("mongoose");

const Bid = require("../../database/Models/bidModel");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const bidInfoPipeline = require("../../database/Pipelines/bidInfoPipeline");

// returns the info about a bid, identified by a given id
const getBid = async (req, res) => {
    try {
        const id = req.params.id;

        if (!isValidObjectId(id)) throw new Error("Invalid id");

        // Apply an join between the bids and users collections
        const [bid] = await Bid.aggregate(bidInfoPipeline(id));
        if (!bid) throw new Error("Bid not Found");

        res.status(200).send(bid);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = getBid;
