const { Types } = require("mongoose");

const pipeline = (id) => [
    {
        $match: { auction: new Types.ObjectId(`${id}`) },
    },
    {
        $sort: {amount: -1}
    },
    {
        $group: {
            _id: null,
           winningBid : {$first: "$$ROOT"} 
        },
    },
    {
        $project: { "winningBid.amount": 1, "_id": 0}
    }
];

module.exports = pipeline;