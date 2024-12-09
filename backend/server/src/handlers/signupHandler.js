const User = require("../database/Models/userModel");
const bcrypt = require("bcrypt")

const signUpHandler = async (req, res) => {
    const userData = req.body;
    try {
        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        const user = await User.create(userData);
        req.session.uid = user._id;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({error: "Username Already Taken"});
    }
}

module.exports = signUpHandler;