const express = require("express");
const {
  addFunds,
  getWalletDetails,
} = require("../controllers/walletController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-funds", protect, addFunds);
router.get("/details", protect, getWalletDetails);

module.exports = router;
