const express = require("express");

const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/stationRoutes");
const trainRoutes = require("./routes/trainRoutes");
const walletRoutes = require("./routes/walletRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const departureNotifier = require("./utils/departureNotifier");
const removeExpiredTicket = require("./utils/removeExpiredTicket");
const connectDB = require("./utils/db");
require("dotenv").config();

const app = express();

connectDB;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);
app.use("/api/train", trainRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/ticket", ticketRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

departureNotifier;
removeExpiredTicket;
