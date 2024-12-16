// sign out the user by destroy the session
const signout = (req, res) => {
  // Removes the client cookie and deletes the session data stored in the Session store.
  req.session.destroy();

  res.status(200).send({ msg: "Sign out successfully" });
};

module.exports = signout;
