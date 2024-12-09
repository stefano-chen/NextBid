// Importing the environment variable from a .env file
require("dotenv").config({ path: `${__dirname}/../.env` });

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const auctionsRoutes = require("./routes/auctions");
const bidsRoutes = require("./routes/bids");
const whoamiRoutes = require("./routes/whoami");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

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
