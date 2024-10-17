const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true,
  },
  startStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  endStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
