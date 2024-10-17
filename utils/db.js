const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully contected to database"))
  .catch((error) => console.log(`Couldn't connect to database : ${error}`));

module.exports = mongoose;
