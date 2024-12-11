const User = require("../../database/Models/userModel");
const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
    try {
        if (req.session.uid) throw new Error("Please Logout before SignIn");

        const userData = req.body;
        const user = await User.findOne({ username: userData.username });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) {
            throw new Error("Invalid Credentials");
        }
        req.session.uid = user._id.toString();
        res.status(200).send({ msg: "Login successful" });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

module.exports = signIn;
