const mongoose = require("mongoose");
const Bid = require("../../database/Models/bidModel");


// TODO: implement the lookup for the auctions collection.

const getBid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) throw new Error("Invalid id");
        // instead of findById, let's use a $lookup aggregation
        // const bid = await Bid.findById(id);
        const [bid] = await Bid.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(`${id}`) } },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $unset: [
                    "user.password",
                    "user.__v",
                    "user.name",
                    "user.surname",
                ],
            },
        ]);
        if (!bid) throw new Error("Bid not Found");
        res.status(200).send(bid);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = getBid;
