// Importing the environment variable from a .env file
// The .env file is a local file not tracker by git/github
// require("dotenv").config({ path: `${__dirname}/../.env` }); // Comment this for production

const express = require("express");
const session = require("express-session");

// Module to manage Single Page Application History
// more info here (https://router.vuejs.org/guide/essentials/history-mode.html#HTML5-Mode)
const history = require("connect-history-api-fallback");

// A Session Store that uses MongoDB to store the sessions data
const MongoDBStore = require("connect-mongodb-session")(session);

// Object Data Modelling (ODM) for MongoDB
const mongoose = require("mongoose");

// Custom routes
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const auctionsRoutes = require("./routes/auctionsRoutes");
const bidsRoutes = require("./routes/bidsRoutes");
const whoamiRoutes = require("./routes/whoamiRuotes");

const app = express();

const PORT = process.env.PORT || 3000;

// Contains the connection string for MongoDB
const MONGO_URI = process.env.MONGO_URI;

// Use MongoDB to store session data, allowing persistence between restarts
const store = new MongoDBStore(
  {
    uri: MONGO_URI,
    collection: "sessions",
  },
  (error) => {
    if (error) {
      console.log(error);
      console.log("Cannot use Session Store");
    }
  }
);

store.on("error", (error) => {
  console.log(error);
});

// Set up the Server Session, used to manage user's authentication
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: "nextbid.sid",
    rolling: false,
    store: store,
    cookie: {
      // If secure set to true: the client browser will send the session cookie only when using a HTTPS connection
      secure: false,
      // Each session has a duration of 30 days
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: "lax",
    },
  })
);

app.use(express.json());

app.use(history());

// Serve the website
app.use("/", express.static(`${__dirname}/public`));

// Endpoint to manage authentication
app.use("/api/auth", authRoutes);

// Endpoint to manage the users data
app.use("/api/users", usersRoutes);

// Endpoint to manage the auctions data
app.use("/api/auctions", auctionsRoutes);

// Endpoint to manage the bids data
app.use("/api/bids", bidsRoutes);

// Endpoint to get info about the logged user
app.use("/api/whoami", whoamiRoutes);

// Listen to HTTP request only if successfully connected to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection to MongoDB Failed");
  });
