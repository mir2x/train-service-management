const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  stops: [
    {
      station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
      },
      time: { type: Date, required: true },
      // basefee for next stop
      baseFee: { type: Number, required: true },
    },
  ],
});
const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
