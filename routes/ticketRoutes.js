const express = require("express");
const { purchaseTicket } = require("../controllers/ticketController");
const { isUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/purchase", isUser, purchaseTicket);

module.exports = router;
