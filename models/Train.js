const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  stops: [
    {
      station: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
      time: Date,
    },
  ],
});

module.exports = mongoose.model("Train", trainSchema);
