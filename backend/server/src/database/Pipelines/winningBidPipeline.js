const { Types } = require("mongoose");

// A MongoDB aggregation pipeline is a sequence of stages.
// Every stage receives in input a set of documents,
// applies some transformation, then pass the transformed document to the next stage
const pipeline = (id) => [
    // outputs all documents with the given id
    {
        $match: { auction: new Types.ObjectId(`${id}`) },
    },
    // sort all document in descending order based on the amount field
    {
        $sort: {amount: -1}
    },
    // outputs only the first document (the one with the highest amount)
    {
        $group: {
            _id: null,
           winningBid : {$first: "$$ROOT"} 
        },
    },
    // Select with field to show in the output document
    // 1 => field selected
    // 0 => field removed
    {
        $project: { "winningBid.amount": 1, "_id": 0}
    }
];

module.exports = pipeline;