const logout = (req, res) => {
    req.session.destroy()
    res.status(200).send({msg: "Logout successfully"});
}

module.exports = logout;