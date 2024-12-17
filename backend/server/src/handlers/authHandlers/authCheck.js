const errorMsg =
  "You must be logged in to access this resource.\n" +
  "Please log in or create an account.";

// Checks if the user is authenticated
// by checking the existence of uid
const authCheck = (req, res, next) => {
  if (!req.session.uid) {
    res.status(401).send({ error: errorMsg });
    return;
  }

  // Calls the next middleware
  next();
};

module.exports = authCheck;
