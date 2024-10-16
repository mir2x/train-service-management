const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const stationRoutes = require("./routes/stationRoutes");
const trainRoutes = require("./routes/trainRoutes");
const walletRoutes = require("./routes/walletRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const departureNotifier = require("./utils/departureNotifier");
const removeExpiredTicket = require("./utils/removeExpiredTicket");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully contected to database"))
  .catch((error) => console.log(`Couldn't connect to database : ${error}`));

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
