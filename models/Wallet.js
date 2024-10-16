const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["credit", "debit", "bkash"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
    required: true,
  },
  transactions: [transactionSchema],
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
