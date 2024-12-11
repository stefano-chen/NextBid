const bcrypt = require("bcrypt");

const User = require("../../database/Models/userModel");

const signIn = async (req, res) => {
    try {
        if (req.session.uid) throw new Error("Please Logout before SignIn");

        const userData = req.body;

        const user = await User.findOne({ username: userData.username });
        if (!user) throw new Error("Invalid Credentials");

        // Compare the received password with the hashed password stored in the database
        // returns True if there is a match, False otherwise
        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) throw new Error("Invalid Credentials");

        // Create the session variable uid used to authenticate the user in the next requests
        req.session.uid = user._id.toString();
        res.status(200).send({ msg: "Login successful" });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

module.exports = signIn;
