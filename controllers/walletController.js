const Wallet = require("../models/Wallet");

const addFunds = async (req, res) => {
  const { method, amount, description } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }
  try {
    let wallet = await Wallet.findOne({ user: req.user.id });
    if (!wallet) {
      wallet = await Wallet.create({
        user: req.user.id,
        balance: 0,
        transactions: [],
      });
    }
    wallet.balance += amount;
    const newTransaction = {
      method: method,
      amount,
      description: description || "Funds added",
    };
    wallet.transactions.push(newTransaction);
    await wallet.save();
    res.status(200).json({
      message: "Funds added successfully",
      wallet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWalletDetails = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json({
      balance: wallet.balance,
      transactions: wallet.transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFunds,
  getWalletDetails,
};
