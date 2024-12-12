// Checks if the user is authenticated
// by checking the existence of uid
const authCheck = (req, res, next) => {
    if (!req.session.uid) {
        res.status(401).send({ error: "Not authenticated" });
        return;
    }

    // Calls the next middleware
    next();
};

module.exports = authCheck;
