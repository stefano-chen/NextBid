const bcrypt = require("bcrypt");

const User = require("../../database/Models/userModel");

const wrongCredentialMsg = "Invalid username or password. Please try again.";

const alreadySignMsg =
  "You are already signed in.\n" +
  "If you wish to access a different account, please sign out first.";

// SignIn based on username and password
// Note: the username is key sensitive
const signIn = async (req, res) => {
  try {
    // Cannot signin if already logged in
    if (req.session.uid) throw new Error(alreadySignMsg);

    const userData = req.body;

    // Returns the user by the given username
    let user = await User.findOne({ username: userData.username });
    if (!user) throw new Error(wrongCredentialMsg);

    // Compare the received password with the hashed password stored in the database
    // returns True if there is a match, False otherwise
    const match = await bcrypt.compare(userData.password, user.password);
    if (!match) throw new Error(wrongCredentialMsg);

    // Create the session variable uid used to authenticate the user in the next requests
    req.session.uid = user._id.toString();
    user = user.toObject();
    delete user.password;
    res.status(200).send(user);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = signIn;
