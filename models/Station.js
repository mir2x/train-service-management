const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  location: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Station", stationSchema);
