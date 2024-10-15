const express = require("express");
const mongoose = require("mongoose");
const dotnev = require("dotenv");

const registrationRoute = require("./routes/auth/registration");
const loginRoute = require("./routes/auth/login");

dotnev.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully contected to database"))
  .catch((error) => console.log(`Couldn't connect to database : ${error}`));

app.use(express.json());

app.use(registrationRoute);
app.use(loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
