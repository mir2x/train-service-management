const express = require("express");
const {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const router = express.Router();

router.post("/create", createStation);
router.get("/", getStations);
router.get("/:id", getStationById);
router.put("/update/:id", updateStation);
router.delete("/delete/:id", deleteStation);

module.exports = router;
