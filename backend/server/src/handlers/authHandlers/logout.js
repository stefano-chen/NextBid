const logout = (req, res) => {
    // Removes the client cookie and deletes the session data stored in the Session store.
    req.session.destroy();

    res.status(200).send({ msg: "Logout successfully" });
};

module.exports = logout;
