const {isValidObjectId} = require("mongoose");
const User = require("../../database/Models/userModel");

const searchUsers = async (req, res) => {
    try {
        const query = req.query;
        if(query._id && !isValidObjectId(query._id))
            throw new Error("Invalid id");
        const users = await User.find(query).select(["_id", "username", "name", "surname"]);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports = searchUsers;
