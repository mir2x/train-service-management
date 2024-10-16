const express = require("express");
const { purchaseTicket } = require("../controllers/ticketController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseTicket);

module.exports = router;
