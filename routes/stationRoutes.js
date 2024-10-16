const express = require("express");
const {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
} = require("../controllers/stationController");
const { isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", isAdmin, createStation);
router.get("/", getStations);
router.get("/:id", getStationById);
router.put("/update/:id", isAdmin, updateStation);
router.delete("/delete/:id", isAdmin, deleteStation);

module.exports = router;
