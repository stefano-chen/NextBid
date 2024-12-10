const logout = (req, res) => {
    if (!req.session.uid) {
        res.status(401).send({error: "Not authenticated"});
        return;
    }
    req.session.destroy()
    res.status(200).send({msg: "Logout successfully"});
}

module.exports = logout;