const express = require("express");
const {
  createStation,
  getStations,
} = require("../controllers/stationController");
const router = express.Router();

router.post("/create", createStation);
router.get("/", getStations);

module.exports = router;
