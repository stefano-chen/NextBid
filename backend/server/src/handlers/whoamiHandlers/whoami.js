const User = require("../../database/Models/userModel");

// Returns the id and username of the logged in user
const whoami = async (req, res) => {
    const user = await User.findById(req.session.uid).select([
        "_id",
        "username",
    ]);
    res.status(200).send(user);
};

module.exports = whoami;
