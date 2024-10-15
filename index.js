const express = require("express");
const mongoose = require("mongoose");
const dotnev = require("dotenv");

dotnev.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully contected to database"))
  .catch((error) => console.log(`Couldn't connect to database : ${error}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
