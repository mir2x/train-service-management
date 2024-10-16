const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const stationRoutes = require("./routes/station");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully contected to database"))
  .catch((error) => console.log(`Couldn't connect to database : ${error}`));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
