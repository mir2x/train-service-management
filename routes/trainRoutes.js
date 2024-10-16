const express = require("express");
const { createTrain, getTrains } = require("../controllers/trainController");
const router = express.Router();

router.post("/create", createTrain);
router.get("/", getTrains);

module.exports = router;
