const express = require("express");
const {
  addFunds,
  getWalletDetails,
} = require("../controllers/walletController");
const { isUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add-funds", isUser, addFunds);
router.get("/details", isUser, getWalletDetails);

module.exports = router;
