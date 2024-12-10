const authCheck = (req, res, next) => {
    if (!req.session.uid) {
        res.status(401).send({error: "Not authenticated"});
        return;
    }
    next();
}

module.exports = authCheck;