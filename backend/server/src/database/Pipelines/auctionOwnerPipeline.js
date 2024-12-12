const { Types } = require("mongoose");

const pipeline = (id) => [
    {
        $match: { _id: new Types.ObjectId(`${id}`) }
    },
    {
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner"
        }
    },
    {
        $unwind: "$owner"
    },
    {
        $unset: ["owner.name", "owner.surname", "owner.password", "owner.__v"]
    }
];

module.exports = pipeline;