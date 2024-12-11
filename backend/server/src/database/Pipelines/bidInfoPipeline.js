const {Types} = require("mongoose");

const pipeline = (id) => [
    { $match: { _id: new Types.ObjectId(`${id}`) } },
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
        $lookup: {
            from: "auctions",
            localField: "auction",
            foreignField: "_id",
            as: "auction",
        },
    },
    { $unwind: "$auction" },
    {
        $project: {
            "price": 1,
            "user._id" : 1,
            "user.username": 1,
            "auction._id": 1,
            "auction.title": 1,
            "auction.dueDate": 1,
            "auction.owner": 1
        },
    },
]

module.exports = pipeline;