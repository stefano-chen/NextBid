// Importing the environment variable from a .env file
require("dotenv").config({ path: `${__dirname}/../.env` });

const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const auctionsRoutes = require("./routes/auctionsRoutes");
const bidsRoutes = require("./routes/bidsRoutes");
const whoamiRoutes = require("./routes/whoamiRuotes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Use MongoDB to store session data, allowing persistence between restarts
const store = new MongoDBStore(
    {
        uri: MONGO_URI,
        collection: "Sessions",
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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        name: "nextbid.sid",
        rolling: true,
        store: store,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 14,
        },
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/auctions", auctionsRoutes);

app.use("/api/bids", bidsRoutes);

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
