const {Types} = require("mongoose");

const pipeline = (id) => [
    {
        $match: {auction: new Types.ObjectId(`${id}`)}
    },
    {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $unwind: "$user"
    },
    {
        $unset: [
            "user.password",
            "user.__v",
            "user.name",
            "user.surname",
            "auction",
            "updatedAt"
        ],
    },
    {
        $sort: {price: -1}
    }
]

module.exports = pipeline;