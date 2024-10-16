const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Train = require("../models/Train");

const purchaseTicket = async (req, res) => {
  try {
    const { trainId, startStation, endStation } = req.body;
    const user = await User.findById(req.user.id);
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
      return res.status(400).json({ error: "Invalid stations" });
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
      type: "debit",
      amount: totalFare,
      description: `Ticket purchase from ${train.stops[startIndex].station.name} to ${train.stops[endIndex].station.name}`,
    });

    await wallet.save();

    res.status(200).json({
      message: "Ticket purchased successfully",
      balance: wallet.balance,
      totalFare,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error purchasing ticket" });
  }
};

module.exports = { purchaseTicket };
