const { Types } = require("mongoose");

const pipeline = (id) => [
  {
    $match: {
      $and: [
        { winner: new Types.ObjectId(`${id}`) },
        { $expr: { $lt: ["$dueDate", { $toDate: new Date() }] } },
      ],
    },
  },
  {
    $unset: ["updatedAt", "__v", "winner"],
  },
  {
    $sort: { dueDate: -1 },
  },
];

module.exports = pipeline;
