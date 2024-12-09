const { default: mongoose } = require("mongoose");
const User = require("../database/Models/userModel");

const whoamiHandler = async (req, res) => {
    if (!req.session.uid) {
        res.status(401).send({ error: "Not authenticated" });
        return;
    }
    const user = await User.findById(req.session.uid).select([
        "_id",
        "username",
    ]);
    res.status(200).send(user);
};

module.exports = whoamiHandler;
