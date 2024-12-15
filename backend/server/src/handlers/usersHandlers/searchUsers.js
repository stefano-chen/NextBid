const { isValidObjectId } = require("mongoose");

const User = require("../../database/Models/userModel");

// Returns an array of users that matches http query
// If not query is provided, then all users are returned
const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    let searchQuery = {};

    if (query) {
      const words = query.trim().split(/\s+/); // Splits on spaces and handles multiple spaces
      searchQuery = {
        $or: words.flatMap((word) => [
          { username: { $regex: word, $options: "i" } },
          { name: { $regex: word, $options: "i" } },
          { surname: { $regex: word, $options: "i" } },
        ]),
      };
    }

    const users = await User.find(searchQuery).select([
      "_id",
      "username",
      "name",
      "surname",
      "bio",
    ]);

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = searchUsers;
