const bcrypt = require("bcrypt");
const { isStrongPassword } = require("validator");

const User = require("../../database/Models/userModel");

const weakPassMsg =
  "The password needs to:\n" +
  "-> include both lower and upper case characters\n" +
  "-> include at least one number \n" +
  "-> be at least 8 characters long";

const alreadySignMsg =
  "You are already signed in.\n" +
  "If you wish to access a different account, please sign out first.";

const usernameTakenMsg =
  "This username is already taken.\n" + "Please try another one.";

// Create a new user
const signUp = async (req, res) => {
  try {
    // Cannot signup if already logged in
    if (req.session.uid) throw new Error(alreadySignMsg);

    const userData = req.body;

    // Check if the username is already taken
    const result = await User.findOne({ username: userData.username });
    if (result) throw new Error(usernameTakenMsg);

    // By default a password is strong if { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
    if (!isStrongPassword(userData.password, { minSymbols: 0 }))
      throw new Error(weakPassMsg);

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
