const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Train = require("../models/Train");
const Ticket = require("../models/Ticket");

const purchaseTicket = async (req, res) => {
  const userId = req.user.id;
  const { trainId, startStation, endStation, method } = req.body;

  try {
    const user = await User.findById(userId);
    const wallet = await Wallet.findOne({ user: user._id });

    if (!wallet) {
      return res.status(400).json({ error: "Wallet not found" });
    }

    const train = await Train.findById(trainId).populate("stops.station");

    const startIndex = train.stops.findIndex((stop) =>
      stop.station._id.equals(startStation)
    );
    const endIndex = train.stops.findIndex((stop) =>
      stop.station._id.equals(endStation)
    );

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
      return res.status(400).json({ error: "Invalid Routes" });
    }

    let totalFare = 0;
    for (let i = startIndex; i < endIndex; i++) {
      totalFare += train.stops[i].baseFee;
    }

    if (wallet.balance < totalFare) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    wallet.balance -= totalFare;
    wallet.transactions.push({
      method: method,
      amount: totalFare,
      description: `Ticket purchase from ${train.stops[startIndex].station.name} to ${train.stops[endIndex].station.name}`,
    });

    await wallet.save();

    const ticket = new Ticket({
      user: userId,
      train: trainId,
      startStation: train.stops[startIndex].station._id,
      endStation: train.stops[endIndex].station._id,
      departureTime: train.stops[startIndex].time,
    });
    await ticket.save();

    res.status(200).json({
      message: "Ticket purchased successfully",
      ticket,
      balance: wallet.balance,
      totalFare,
    });
  } catch (error) {
    res.status(500).json({ error: `Error purchasing ticket: ${error}` });
  }
};

module.exports = { purchaseTicket };
