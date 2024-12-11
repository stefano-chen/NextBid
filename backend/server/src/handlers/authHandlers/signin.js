const User = require("../../database/Models/userModel");
const bcrypt = require("bcrypt");

const signIn = async (req, res) => {
    const userData = req.body;
    try {
        const user = await User.findOne({username: userData.username});
        if (!user){
            throw new Error();
        }
        const match = await bcrypt.compare(userData.password, user.password);
        if (!match) {
            throw new Error();
        }
        req.session.uid = user._id.toString();
        res.status(200).send({msg: "Login successful"});
    } catch (error) {
        res.status(401).send({error: "Invalid Credentials"});
    }
}

module.exports = signIn;