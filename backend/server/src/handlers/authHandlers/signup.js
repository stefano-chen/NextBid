const bcrypt = require("bcrypt");
const { isStrongPassword } = require("validator");

const User = require("../../database/Models/userModel");

// Create a new user
const signUp = async (req, res) => {
  try {
    // Cannot signup if already logged in
    if (req.session.uid) throw new Error("Please Sign out before Signing up");

    const userData = req.body;

    // Check if the username is already taken
    const result = await User.findOne({ username: userData.username });
    if (result) throw new Error("Username Already Taken");

    // By default a password is strong if { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
    if (!isStrongPassword(userData.password, { minSymbols: 0 }))
      throw new Error("Weak Password");

    // the .hash method requires an string (in this case the user's password)
    // and a number indicating the saltRounds used to salt and hash the password
    // the higher the number the more secure is the hash
    // the higher the number the more computation power is required
    const hash = await bcrypt.hash(userData.password, 10);

    // Store the hashed password (the hash also contains the salt)
    userData.password = hash;
    let user = await User.create(userData);

    // Create the session variable uid used to authenticate the user in the next requests
    req.session.uid = user._id.toString();
    user = user.toObject();
    delete user.password;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = signUp;
