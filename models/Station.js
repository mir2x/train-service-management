const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  location: { type: String, required: true },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
