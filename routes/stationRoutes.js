const express = require("express");
const {
  createStation,
  getStations,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const router = express.Router();

router.post("/create", createStation);
router.get("/", getStations);
router.put("/update/:id", updateStation);
router.delete("/delete/:id", deleteStation);

module.exports = router;
