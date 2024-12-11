const User = require("../../database/Models/userModel");
const bcrypt = require("bcrypt");
const { isStrongPassword } = require("validator");

const signUp = async (req, res) => {
    try {
        if (req.session.uid) throw new Error("Please Logout before SignUp");

        const userData = req.body;
        const result = await User.findOne({ username: userData.username });

        if (result) throw new Error("Username Already Taken");

        // By default a password is strong if { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
        if (!isStrongPassword(userData.password, { minSymbols: 0 })) {
            throw new Error("Weak Password");
        }

        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
        const { username, name, surname, _id } = await User.create(userData);
        const user = { _id, username, name, surname };
        req.session.uid = user._id.toString();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

module.exports = signUp;
