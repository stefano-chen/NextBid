const {isValidObjectId} = require("mongoose");
const User = require("../../database/Models/userModel");

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!isValidObjectId(id))
            throw new Error("Invalid id");
        const user = await User.findById(id, "username name surname");
        if (!user)
            throw new Error("User not Found");
        res.status(200).send(user);        
    } catch (error) {
        res.status(404).send({error: error.message});
    }
}

module.exports = getUser;